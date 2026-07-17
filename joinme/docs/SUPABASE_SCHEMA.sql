-- ====================================================================
-- JOINME ECOSYSTEM - SUPABASE BLUEPRINT SCHEMA
-- ====================================================================
-- Dokumen ini dirancang oleh Chief Architect sebagai panduan migrasi data 
-- dari penyimpanan lokal (localStorage) ke database relasional Supabase (PostgreSQL).
-- 
-- Fitur Keamanan:
-- - Row Level Security (RLS) diaktifkan secara bawaan.
-- - Sinkronisasi otomatis pengguna Supabase Auth dengan tabel publik 'users'.
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL: USERS (PROFIL PENGGUNA)
-- Sinkron dengan Supabase Auth (auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Mengaktifkan Row Level Security (RLS) pada tabel users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS untuk Users
CREATE POLICY "Pengguna dapat membaca profil sendiri" 
    ON public.users FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Pengguna dapat memperbarui profil sendiri" 
    ON public.users FOR UPDATE 
    USING (auth.uid() = id);


-- 3. TABEL: SUBSCRIPTIONS (SISTEM LANGGANAN)
-- Mencatat level akses pengguna (Free vs Premium)
CREATE TYPE subscription_tier AS ENUM ('free', 'premium');

CREATE TABLE public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    tier subscription_tier DEFAULT 'free'::subscription_tier NOT NULL,
    status VARCHAR(50) DEFAULT 'active' NOT NULL, -- active, trialing, canceled, past_due
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS untuk Subscriptions
CREATE POLICY "Pengguna dapat melihat status langganan sendiri" 
    ON public.subscriptions FOR SELECT 
    USING (auth.uid() = user_id);


-- 4. TABEL: INVITATIONS (UNDANGAN PERNIKAHAN DIGITAL)
-- Menyimpan semua data konten undangan milik pengguna
CREATE TABLE public.invitations (
    id VARCHAR(100) PRIMARY KEY, -- Menggunakan ID unik yang dihasilkan di frontend/backend
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    host_name VARCHAR(255) NOT NULL,
    theme VARCHAR(100) DEFAULT 'sample-theme' NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb NOT NULL, -- Array URL gambar pendukung
    gift JSONB DEFAULT '[]'::jsonb NOT NULL,      -- Array informasi kado digital / rekening
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS untuk Invitations
CREATE POLICY "Semua orang dapat melihat undangan publik" 
    ON public.invitations FOR SELECT 
    USING (true);

CREATE POLICY "Pengguna hanya dapat mengelola undangan miliknya" 
    ON public.invitations FOR ALL 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);


-- 5. TRIGGER: OTOMATIS MEMBUAT PROFIL PENGGUNA BARU
-- Saat pendaftaran berhasil di Supabase Auth, buat record di tabel public.users & public.subscriptions secara otomatis
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Masukkan ke tabel users
    INSERT INTO public.users (id, email, full_name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');

    -- Masukkan paket langganan bawaan (Free)
    INSERT INTO public.subscriptions (user_id, tier)
    VALUES (new.id, 'free'::subscription_tier);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ====================================================================
-- PANDUAN KUERI MIGRASI (LOCAL STORAGE VS SUPABASE JS SDK)
-- ====================================================================

/*
  1. REGISTRASI & LOGIN PENGGUNA
  
  * LOCAL STORAGE (Lama):
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

  * SUPABASE SDK (Baru):
    const { data, error } = await supabase.auth.signUp({
      email: 'mempelai@example.com',
      password: 'secretpassword123',
      options: {
        data: { full_name: 'Kevin & Clarissa' }
      }
    });
*/

/*
  2. MENGAMBIL PAKET LANGGANAN AKTIF (SUBSCRIPTION TIER)
  
  * LOCAL STORAGE (Lama):
    const currentTier = localStorage.getItem("user-subscription") || "free";

  * SUPABASE SDK (Baru):
    const { data: sub, error } = await supabase
      .from('subscriptions')
      .select('tier')
      .single();
    const currentTier = sub?.tier || 'free';
*/

/*
  3. UPGRADE LANGGANAN KE PREMIUM
  
  * LOCAL STORAGE (Lama):
    localStorage.setItem("user-subscription", "premium");

  * SUPABASE SDK (Baru):
    const { data, error } = await supabase
      .from('subscriptions')
      .update({ tier: 'premium', updated_at: new Date().toISOString() })
      .eq('user_id', supabase.auth.user().id);
*/

/*
  4. VALIDASI & PEMBUATAN UNDANGAN (DENGAN BATASAN PAKET GRATIS)
  
  * LOCAL STORAGE (Lama):
    const existingInvites = JSON.parse(localStorage.getItem("joinme-invitations") || "[]");
    if (subTier !== "premium" && existingInvites.length >= 1) {
      alert("Batas Paket Gratis!");
    }

  * SUPABASE SDK (Baru):
    // A. Hitung undangan yang sudah dibuat pengguna
    const { count, error: countError } = await supabase
      .from('invitations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // B. Ambil tipe langganan pengguna
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('tier')
      .single();

    // C. Validasi kuota
    if (sub?.tier !== 'premium' && count >= 1) {
      throw new Error("Kuota paket gratis habis! Silakan upgrade ke Premium.");
    }

    // D. Simpan undangan baru ke tabel Database relasional
    const { error: insertError } = await supabase
      .from('invitations')
      .insert({
        id: uniqueId,
        user_id: userId,
        event_name: 'Pernikahan Kevin & Clarissa',
        event_date: '2026-10-12T10:00:00Z',
        location: 'Gedung Pertemuan Utama',
        host_name: 'Keluarga Bpk. Kusuma',
        theme: 'reels-story',
        gallery: JSON.stringify(galleryImages),
        gift: JSON.stringify(giftAccounts)
      });
*/

/*
  5. MENGAMBIL DETAIL UNDANGAN DI HALAMAN RUNTIME (PREVIEW)
  
  * LOCAL STORAGE (Lama):
    const all = JSON.parse(localStorage.getItem("joinme-invitations") || "[]");
    const invite = all.find(i => i.id === inviteId);

  * SUPABASE SDK (Baru):
    const { data: invite, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', inviteId)
      .single();
*/
