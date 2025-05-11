export interface States {
  startPage?: number;
  endPage?: number;
  bookProgressId?: number;
  readPages?: number;
  totalPages?: number;
  progressPercentage?: number;
  summary?: string;
  dailyReadingProgress?: DailyReading[];
}
interface DailyReading {
  readPages?: number;
  date?: Date;
}
