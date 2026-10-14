import { ChapterInfo } from '../../types';
import { NCERT_PRIMARY_CHAPTERS } from './ncertPrimary';
import { NCERT_MIDDLE_CHAPTERS } from './ncertMiddle';
import { NCERT_SECONDARY_CHAPTERS } from './ncertSecondary';
import { NCERT_SENIOR_CHAPTERS } from './ncertSenior';

export const ALL_NCERT_CHAPTERS: ChapterInfo[] = [
  ...NCERT_PRIMARY_CHAPTERS,
  ...NCERT_MIDDLE_CHAPTERS,
  ...NCERT_SECONDARY_CHAPTERS,
  ...NCERT_SENIOR_CHAPTERS,
];

export {
  NCERT_PRIMARY_CHAPTERS,
  NCERT_MIDDLE_CHAPTERS,
  NCERT_SECONDARY_CHAPTERS,
  NCERT_SENIOR_CHAPTERS,
};
