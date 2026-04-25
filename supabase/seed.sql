-- Services table (run once in Supabase SQL editor)
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  content text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Seed initial services (skip if slug already exists)
INSERT INTO services (title, slug, description)
VALUES
  ('Rendering Services', 'rendering-services', 'Professional rendering solutions for architectural and product visualisation.'),
  ('3D Modelling',       '3d-modelling',       'High-quality 3D modelling for design, architecture, and production.'),
  ('AI Consulting',      'ai-consulting',       'AI-driven solutions and consulting for modern businesses.'),
  ('Web Development',    'web-development',     'Custom, scalable web development tailored for business growth.')
ON CONFLICT (slug) DO NOTHING;
