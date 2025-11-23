let sharedAudio: HTMLAudioElement | null = null;

export function getAudioInstance() {
  return sharedAudio;
}

export function createAudioInstance(url: string) {
  if (!sharedAudio) {
    sharedAudio = new Audio(url);
    sharedAudio.preload = "none";
  }
  return sharedAudio;
}

export function destroyAudioInstance() {
  if (sharedAudio) {
    sharedAudio.pause();
    sharedAudio.src = "";
    sharedAudio.load();
    sharedAudio = null;
  }
}
