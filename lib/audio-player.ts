let sharedAudio: HTMLAudioElement | null = null;

export function getAudioInstance() {
  return sharedAudio;
}

export function createAudioInstance(url: string) {
  if (!sharedAudio) {
    sharedAudio = new Audio(url);
    sharedAudio.preload = "none";
    // Set a low default volume for a pleasant initial experience
    sharedAudio.volume = 0.12;
    // Keep stream playing continuously when user hits play
    sharedAudio.loop = true;
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

export function setAudioVolume(v: number) {
  if (!sharedAudio) return
  sharedAudio.volume = Math.max(0, Math.min(1, v))
}

export function getAudioVolume() {
  return sharedAudio?.volume ?? 0
}
