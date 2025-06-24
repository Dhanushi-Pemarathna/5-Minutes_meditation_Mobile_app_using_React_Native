export default class Session {
    constructor({ username, startTime, endTime, completed }) {
      this.username = username;
      this.startTime = startTime;
      this.endTime = endTime;
      this.completed = completed;
    }
  
    getFormattedDuration() {
      const durationSeconds = Math.floor((this.endTime - this.startTime) / 1000);
      const minutes = Math.floor(durationSeconds / 60);
      const seconds = durationSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  
    toStorageObject() {
      return {
        username: this.username,
        date: new Date(this.endTime).toLocaleString(),
        duration: this.getFormattedDuration(),
        completed: this.completed,
      };
    }
  }
  