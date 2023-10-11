class Timer {
    constructor(startingDuration, element) {
        this.startingDuration = startingDuration;
        this.countdownDuration = startingDuration;
        this.isRunning = false;
        this.element = element;
        this.ticker;
    }

    getCountdownDuration() {
        return this.countdownDuration;
    }

    setCountdownDuration(duration) {
        this.countdownDuration = duration;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.countdownDuration = parseInt(this.countdownDuration);
            this.ticker = setInterval(() => {
                if (this.countdownDuration > 0) {
                    this.countdownDuration--;
                    this.updateTimer();
                } else {
                    clearInterval(this.ticker);
                    this.isRunning = false;
                }
            }, 10);
        }
    }

    stop() {
        if (this.isRunning) {
            clearInterval(this.ticker);
            this.isRunning = false;
        }
    }

    reset() {
        this.countdownDuration = this.startingDuration;
        this.updateTimer();
    }

    addTime(toadd) {
        if (this.isRunning) {
            if (this.countdownDuration < this.startingDuration) {
                this.countdownDuration = this.countdownDuration + parseInt(toadd);
                if (this.countdownDuration > this.startingDuration) {
                    this.countdownDuration = this.startingDuration;
                }
                this.updateTimer();
            }
        }
    }

    removeTime(toremove) {
        if (this.countdownDuration > 0) {
            this.countdownDuration = this.countdownDuration - parseInt(toremove);
            if (this.countdownDuration <= 0) {
                this.countdownDuration = 0;
                this.stop;
            }
            this.updateTimer();
        }
    }

    updateTimer() {
        var secs = Math.floor(this.countdownDuration / 100);
        var hundredSecs = this.countdownDuration % 100;
        var mins = Math.floor(secs / 60);
        secs %= 60;
        var timer =
            ((mins < 10) ? "0" : "") + mins + ":" +
            ((secs < 10) ? "0" : "") + secs + ":" +
            ((hundredSecs < 10) ? "0" : "") + hundredSecs;

        document.getElementById(this.element).innerHTML = timer;
    }
}



