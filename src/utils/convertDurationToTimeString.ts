export function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const timeWithPad = [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0'));
  const timeString = timeWithPad.join(':');

  return timeString;
}