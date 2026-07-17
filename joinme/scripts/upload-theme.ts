import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import AdmZip from "adm-zip";

interface Manifest {
  name: string;
  version: string;
  entry: string;
  [key: string]: any;
}

function run() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const pathArgIndex = args.indexOf("--path");
  
  if (pathArgIndex === -1 || pathArgIndex + 1 >= args.length) {
    console.error("❌ Error: Parameter --path wajib ditentukan.");
    console.log("Usage: npx tsx scripts/upload-theme.ts --path themes/sample-theme");
    process.exit(1);
  }

  const themeRelativePath = args[pathArgIndex + 1];
  const themePath = path.resolve(process.cwd(), themeRelativePath);

  console.log(`\n📦 Menginisialisasi upload theme dari: ${themeRelativePath}`);

  if (!fs.existsSync(themePath)) {
    console.error(`❌ Error: Folder theme "${themePath}" tidak ditemukan.`);
    process.exit(1);
  }

  // 1. Membaca & Memvalidasi manifest.json
  const manifestPath = path.join(themePath, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    console.error(`❌ Error: File manifest.json tidak ditemukan di ${themePath}`);
    process.exit(1);
  }

  let manifest: Manifest;
  try {
    const rawManifest = fs.readFileSync(manifestPath, "utf-8");
    manifest = JSON.parse(rawManifest);
  } catch (err) {
    console.error("❌ Error: Gagal membaca atau mem-parsing manifest.json", err);
    process.exit(1);
  }

  // Validasi properti wajib
  const requiredFields = ["name", "version", "entry"];
  for (const field of requiredFields) {
    if (!manifest[field]) {
      console.error(`❌ Error: Field "${field}" wajib ada di manifest.json.`);
      process.exit(1);
    }
  }

  console.log("✅ Manifest tervalidasi dengan sukses!");
  console.log(`   - Nama: ${manifest.name}`);
  console.log(`   - Versi: ${manifest.version}`);
  console.log(`   - Entry: ${manifest.entry}`);

  // 2. Memastikan theme sudah dibuild ke folder dist/
  const distPath = path.join(themePath, "dist");
  if (!fs.existsSync(distPath) || fs.readdirSync(distPath).length === 0) {
    console.log("⚠️  Folder dist/ kosong atau tidak ditemukan. Memulai proses build...");
    try {
      execSync("npm run build", { cwd: themePath, stdio: "inherit" });
      console.log("✅ Proses build theme berhasil dilakukan!");
    } catch (err) {
      console.error("❌ Error: Gagal melakukan build pada theme.", err);
      process.exit(1);
    }
  } else {
    console.log("✅ Folder dist/ terdeteksi.");
  }

  // 3. Menyiapkan folder tujuan penyimpanan ZIP di public/themes
  const publicThemesPath = path.resolve(process.cwd(), "joinme/apps/runtime/public/themes");
  if (!fs.existsSync(publicThemesPath)) {
    fs.mkdirSync(publicThemesPath, { recursive: true });
  }

  // Format penamaan file ZIP
  const safeName = manifest.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const zipFileName = `${safeName}-${manifest.version}.zip`;
  const zipDestPath = path.join(publicThemesPath, zipFileName);

  // 4. Membuat file ZIP menggunakan adm-zip
  console.log(`🤐 Membuat arsip ZIP untuk theme: ${zipFileName}...`);
  try {
    const zip = new AdmZip();
    
    // Tambahkan file manifest.json
    zip.addLocalFile(manifestPath);
    
    // Tambahkan seluruh isi folder dist/ ke subfolder "dist" di dalam ZIP
    zip.addLocalFolder(distPath, "dist");
    
    // Tulis ke file tujuan
    zip.writeZip(zipDestPath);

    console.log(`\n🎉 SUKSES: Theme berhasil dikemas dan diunggah secara lokal!`);
    console.log(`💾 Lokasi berkas ZIP: ${zipDestPath}`);
    console.log(`📏 Ukuran berkas: ${(fs.statSync(zipDestPath).size / 1024).toFixed(2)} KB`);
  } catch (err) {
    console.error("❌ Error: Gagal membuat file ZIP menggunakan adm-zip.", err);
    process.exit(1);
  }
}

run();

