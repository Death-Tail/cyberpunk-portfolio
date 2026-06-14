-- ══════════════════════════════════════════════════════════
-- Seed data: migrates existing data/*.ts entries into Supabase
-- Run this AFTER migration.sql in the Supabase SQL Editor
-- ══════════════════════════════════════════════════════════

-- ── Watch Entries ─────────────────────────────────────────
INSERT INTO public.watch_entries (title, jp_title, kind, year, status, episodes, note, tags, sort_order) VALUES
  ('Scum''s Wish', 'クズの本懐', 'anime', 2017, 'watching', 12, NULL, '{}', 0),
  ('Hunter x Hunter', 'HUNTER×HUNTER', 'anime', 2011, 'finished', 148, NULL, '{}', 1),
  ('Monster', 'MONSTER', 'anime', 2004, 'finished', 74, 'Urasawa. Patient, exact, devastating in the third act.', '{}', 2),
  ('Fullmetal Alchemist', '鋼の錬金術師', 'anime', 2003, 'finished', 51, NULL, '{}', 3),
  ('Fullmetal Alchemist: Brotherhood', '鋼の錬金術師 FULLMETAL ALCHEMIST', 'anime', 2009, 'finished', 64, NULL, '{}', 4),
  ('Solo Leveling', '俺だけレベルアップな件', 'anime', 2024, 'finished', NULL, NULL, '{}', 5),
  ('Cowboy Bebop', 'カウボーイビバップ', 'anime', 1998, 'finished', 26, NULL, '{}', 6),
  ('Berserk', '剣風伝奇ベルセルク', 'anime', 1997, 'finished', 25, NULL, '{}', 7),
  ('Alya Sometimes Hides Her Feelings in Russian', 'ロシデレ', 'anime', 2024, 'finished', NULL, NULL, '{}', 8),
  ('The Eminence in Shadow', '陰の実力者になりたくて！', 'anime', 2022, 'finished', NULL, NULL, '{}', 9),
  ('91 Days', NULL, 'anime', 2016, 'finished', 12, NULL, '{}', 10),
  ('11eyes', NULL, 'anime', 2009, 'finished', 12, NULL, '{}', 11),
  ('Moriarty the Patriot', '憂国のモリアーティ', 'anime', 2020, 'finished', NULL, NULL, '{}', 12),
  ('Banana Fish', 'BANANA FISH', 'anime', 2018, 'finished', 24, NULL, '{}', 13),
  ('Jujutsu Kaisen', '呪術廻戦', 'anime', 2020, 'finished', NULL, NULL, '{}', 14),
  ('Bungo Stray Dogs', '文豪ストレイドッグス', 'anime', 2016, 'finished', NULL, NULL, '{}', 15),
  ('BLAME!', 'ブラム', 'film', 2017, 'finished', NULL, 'Tsutomu Nihei. Concrete forever.', '{}', 16),
  ('Tokyo Ghoul', '東京喰種', 'anime', 2014, 'finished', NULL, NULL, '{}', 17),
  ('Akame ga Kill!', 'アカメが斬る！', 'anime', 2014, 'finished', 24, NULL, '{}', 18),
  ('Akuma no Riddle', '悪魔のリドル', 'anime', 2014, 'finished', 12, NULL, '{}', 19),
  ('Death Note', 'デスノート', 'anime', 2006, 'finished', 37, NULL, '{}', 20),
  ('Neon Genesis Evangelion', '新世紀エヴァンゲリオン', 'anime', 1995, 'finished', 26, NULL, '{}', 21),
  ('Parasyte: The Maxim', '寄生獣 セイの格率', 'anime', 2014, 'finished', 24, NULL, '{}', 22),
  ('Guilty Crown', 'ギルティクラウン', 'anime', 2011, 'finished', 22, NULL, '{}', 23),
  ('Spy × Family', 'SPY×FAMILY', 'anime', 2022, 'finished', NULL, NULL, '{}', 24),
  ('The Witch and the Beast', '魔女と野獣', 'anime', 2024, 'finished', NULL, NULL, '{}', 25),
  ('Dandadan', 'ダンダダン', 'anime', 2024, 'finished', NULL, NULL, '{}', 26),
  ('Claymore', 'クレイモア', 'anime', 2007, 'finished', 26, NULL, '{}', 27),
  ('Vampire Hunter D: Bloodlust', 'バンパイアハンターD', 'film', 2000, 'finished', NULL, NULL, '{}', 28),
  ('A Silent Voice', '聲の形', 'film', 2016, 'finished', NULL, NULL, '{}', 29),
  ('Your Name', '君の名は。', 'film', 2016, 'finished', NULL, NULL, '{}', 30),
  ('Studio Ghibli — the whole family', NULL, 'film', 1986, 'finished', NULL, 'Miyazaki / Takahata. Most of them. Some twice.', '{}', 31),
  ('Dead Poets Society', NULL, 'film', 1989, 'finished', NULL, NULL, '{}', 32),
  ('Detachment', NULL, 'film', 2011, 'finished', NULL, NULL, '{}', 33),
  ('House of D', NULL, 'film', 2004, 'finished', NULL, NULL, '{}', 34),
  ('The Pursuit of Happyness', NULL, 'film', 2006, 'finished', NULL, NULL, '{}', 35),
  ('The Devil''s Advocate', NULL, 'film', 1997, 'finished', NULL, NULL, '{}', 36),
  ('Chernobyl', NULL, 'series', 2019, 'finished', 5, 'HBO. The kitchen scene.', '{}', 37),
  ('True Detective', NULL, 'series', 2014, 'finished', NULL, NULL, '{}', 38),
  ('Dark', NULL, 'series', 2017, 'finished', 26, NULL, '{}', 39),
  ('From', NULL, 'series', 2022, 'finished', NULL, NULL, '{}', 40),
  ('The Walking Dead', NULL, 'series', 2010, 'finished', NULL, NULL, '{}', 41),
  ('Friends', NULL, 'series', 1994, 'finished', NULL, NULL, '{}', 42),
  ('The Office (US)', NULL, 'series', 2005, 'finished', NULL, NULL, '{}', 43),
  ('Modern Family', NULL, 'series', 2009, 'finished', NULL, NULL, '{}', 44),
  ('Family Guy', NULL, 'series', 1999, 'finished', NULL, NULL, '{}', 45),
  ('American Dad!', NULL, 'series', 2005, 'finished', NULL, NULL, '{}', 46),
  ('Mind Your Language', NULL, 'series', 1977, 'finished', NULL, NULL, '{}', 47),
  ('Policías, en el corazón de la calle', NULL, 'series', 2003, 'finished', NULL, 'Spanish', '{}', 48),
  ('El internado', NULL, 'series', 2007, 'finished', NULL, 'Spanish', '{}', 49),
  ('The Boarding School: Las Cumbres', NULL, 'series', 2021, 'finished', NULL, 'Spanish', '{}', 50);

-- ── Read Entries ──────────────────────────────────────────
INSERT INTO public.read_entries (title, jp_title, kind, year, status, chapters, note, tags, sort_order) VALUES
  ('Dorohedoro', 'ドロヘドロ', 'manga', 2000, 'reading', NULL, 'Q Hayashida''s filthy, generous world.', '{}', 0),
  ('Solo Leveling', NULL, 'manhwa', 2018, 'finished', 200, NULL, '{}', 1),
  ('Chainsaw Man', 'チェンソーマン', 'manga', 2018, 'finished', NULL, 'Fujimoto. Part 1 was a knife.', '{}', 2),
  ('My Girlfriend Is a Mobster', NULL, 'manhwa', NULL, 'finished', NULL, NULL, '{}', 3);

-- ── Play Entries ──────────────────────────────────────────
INSERT INTO public.play_entries (title, kind, year, status, favorite, note, tags, sort_order) VALUES
  ('Call of Duty: Warzone', 'live', 2020, 'playing', false, NULL, '{fps,live-service}', 0),
  ('Cyberpunk 2077', 'single', 2020, 'finished', true, 'All-time. Phantom Liberty doubled it.', '{rpg,openworld}', 1),
  ('Resident Evil — the franchise', 'single', NULL, 'finished', true, 'From the originals through Village. Forever yes.', '{horror}', 2),
  ('The Last of Us · Part 1', 'single', 2013, 'finished', false, NULL, '{}', 3),
  ('The Walking Dead (Telltale)', 'single', 2012, 'finished', false, NULL, '{}', 4),
  ('Genshin Impact', 'live', 2020, 'endless', false, NULL, '{gacha,openworld}', 5),
  ('Arena of Valor', 'live', 2016, 'endless', false, NULL, '{moba}', 6),
  ('Wuthering Waves', 'live', 2024, 'endless', false, NULL, '{gacha,action}', 7),
  ('Neverness to Everness', 'live', 2025, 'endless', false, NULL, '{gacha}', 8),
  ('Phasmophobia', 'live', 2020, 'endless', false, NULL, '{horror,co-op}', 9),
  ('R.E.P.O.', 'live', 2025, 'endless', false, NULL, '{horror,co-op}', 10),
  ('Command & Conquer: Generals — Zero Hour', 'single', 2003, 'finished', false, NULL, '{rts}', 11),
  ('Empire Earth', 'single', 2001, 'finished', false, NULL, '{rts}', 12),
  ('Age of Empires III', 'single', 2005, 'finished', false, NULL, '{rts}', 13),
  ('Dragon Raja', 'live', 2019, 'playing', false, NULL, '{mmo}', 14);

-- ── Tracker Items (PC Upgrade Tracker) ───────────────────
INSERT INTO public.tracker_items (section, name, cat, price, note, date, priority, status, sort_order) VALUES
  ('bought', 'Attack Shark X98 Pro', 'Keyboard', 103500, 'item 99k + 4,500k delivery', '2026-06-06', NULL, NULL, 0),
  ('wish', 'Desk', 'Desk', 0, 'Next purchase — looking for 160–200cm aesthetic setup', NULL, 'high', 'next', 0),
  ('wish', 'PC Case', 'Case', 0, 'Aesthetic build — 3D animation, gaming & work', NULL, 'high', 'hold', 1),
  ('wish', 'Monitor', 'Monitor', 0, 'On hold until desk is sorted', NULL, 'high', 'hold', 2),
  ('wish', 'GPU', 'GPU', 0, 'High-end for 3D animation & gaming', NULL, 'high', 'hold', 3),
  ('wish', 'CPU', 'CPU', 0, 'On hold until order is confirmed', NULL, 'medium', 'hold', 4),
  ('wish', 'Motherboard', 'Motherboard', 0, 'On hold', NULL, 'medium', 'hold', 5),
  ('wish', 'RAM', 'RAM', 0, 'On hold', NULL, 'medium', 'hold', 6),
  ('wish', 'Storage', 'Storage', 0, 'On hold', NULL, 'medium', 'hold', 7),
  ('wish', 'PSU', 'PSU', 0, 'On hold', NULL, 'medium', 'hold', 8),
  ('wish', 'Cooling', 'Cooling', 0, 'On hold', NULL, 'low', 'hold', 9),
  ('wish', 'Chair', 'Chair', 0, 'On hold', NULL, 'low', 'hold', 10);

