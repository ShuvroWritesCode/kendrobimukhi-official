-- KB Command Center Database Schema Migration
-- Run this SQL in your Supabase SQL Editor

-- ==================== 1. Admin Users Table ====================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES admin_users(id),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for admin_users
CREATE POLICY "Allow authenticated users to read admin_users" ON admin_users
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert their own admin record" ON admin_users
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow approved admins to update admin_users" ON admin_users
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_approved = true
    )
  );

CREATE POLICY "Allow approved admins to delete admin_users" ON admin_users
  FOR DELETE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_approved = true
    )
  );

-- ==================== 2. Event Categories Table ====================
CREATE TABLE IF NOT EXISTS event_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE event_categories ENABLE ROW LEVEL SECURITY;

-- Policies for event_categories
CREATE POLICY "Allow public read access" ON event_categories
  FOR SELECT USING (true);

CREATE POLICY "Allow approved admins to manage event_categories" ON event_categories
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_approved = true
    )
  );

-- ==================== 3. Update Events Table ====================
-- Add new columns to events table
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS registration_link TEXT,
  ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES event_categories(id);

-- ==================== 4. Update Authors Table ====================
-- Rename 'name' to 'fullname' and add new columns
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'authors' AND column_name = 'name') THEN
    ALTER TABLE authors RENAME COLUMN name TO fullname;
  END IF;
END $$;

ALTER TABLE authors
  ADD COLUMN IF NOT EXISTS institution TEXT,
  ADD COLUMN IF NOT EXISTS dob DATE;

-- If fullname column doesn't exist but name column was already renamed/doesn't exist
ALTER TABLE authors
  ADD COLUMN IF NOT EXISTS fullname TEXT;

-- ==================== 5. Update Blogs Table ====================
-- Add new columns to blogs table
ALTER TABLE blogs
  ADD COLUMN IF NOT EXISTS heading TEXT,
  ADD COLUMN IF NOT EXISTS summary TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Migrate excerpt to summary if needed (one-time migration)
UPDATE blogs SET summary = excerpt WHERE summary IS NULL AND excerpt IS NOT NULL;

-- ==================== 6. Update Categories Table ====================
-- Add created_at if it doesn't exist
ALTER TABLE categories
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ==================== 7. Ensure RLS Policies for Existing Tables ====================

-- Events policies
DROP POLICY IF EXISTS "Allow public read access" ON events;
CREATE POLICY "Allow public read access" ON events
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow approved admins to manage events" ON events;
CREATE POLICY "Allow approved admins to manage events" ON events
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_approved = true
    )
  );

-- Blogs policies
DROP POLICY IF EXISTS "Allow public read access to published blogs" ON blogs;
CREATE POLICY "Allow public read access to published blogs" ON blogs
  FOR SELECT USING (status = 'published' OR
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_approved = true
    )
  );

DROP POLICY IF EXISTS "Allow approved admins to manage blogs" ON blogs;
CREATE POLICY "Allow approved admins to manage blogs" ON blogs
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_approved = true
    )
  );

-- Authors policies
DROP POLICY IF EXISTS "Allow public read access" ON authors;
CREATE POLICY "Allow public read access" ON authors
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow approved admins to manage authors" ON authors;
CREATE POLICY "Allow approved admins to manage authors" ON authors
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_approved = true
    )
  );

-- Categories policies
DROP POLICY IF EXISTS "Allow public read access" ON categories;
CREATE POLICY "Allow public read access" ON categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow approved admins to manage categories" ON categories;
CREATE POLICY "Allow approved admins to manage categories" ON categories
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND is_approved = true
    )
  );

-- ==================== 8. Create First Admin (Run manually after signup) ====================
-- After your first admin signs up, run this to approve them:
-- UPDATE admin_users SET is_approved = true, approved_at = NOW() WHERE email = 'your-email@example.com';
