import * as migration_20251129_152237_add_faqs from './20251129_152237_add_faqs';
import * as migration_20251129_154053_add_faqs_relations from './20251129_154053_add_faqs_relations';
import * as migration_20251129_155530_refactor_faqs from './20251129_155530_refactor_faqs';
import * as migration_20251129_160452_add_faq_categories_relations from './20251129_160452_add_faq_categories_relations';
import * as migration_20251214_190539_search_logs from './20251214_190539_search_logs';

export const migrations = [
  {
    up: migration_20251129_152237_add_faqs.up,
    down: migration_20251129_152237_add_faqs.down,
    name: '20251129_152237_add_faqs',
  },
  {
    up: migration_20251129_154053_add_faqs_relations.up,
    down: migration_20251129_154053_add_faqs_relations.down,
    name: '20251129_154053_add_faqs_relations',
  },
  {
    up: migration_20251129_155530_refactor_faqs.up,
    down: migration_20251129_155530_refactor_faqs.down,
    name: '20251129_155530_refactor_faqs',
  },
  {
    up: migration_20251129_160452_add_faq_categories_relations.up,
    down: migration_20251129_160452_add_faq_categories_relations.down,
    name: '20251129_160452_add_faq_categories_relations',
  },
  {
    up: migration_20251214_190539_search_logs.up,
    down: migration_20251214_190539_search_logs.down,
    name: '20251214_190539_search_logs'
  },
];
