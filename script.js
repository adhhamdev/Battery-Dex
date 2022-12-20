const battery = navigator.getBattery();
const statusInfo = document.querySelector('.status');
const state = document.querySelector('.state');
const batteryPercent = document.querySelector('.battery_percent');
const level = document.querySelector('.level');
const history = document.querySelector('.history');

battery.then(data => {
    const date = new Date();
    const time = date.getHours() + ' : ' + date.getMinutes();
    let activity;
    const updateBatteryState = () => {
        if(data.charging) {
            state.textContent = 'CHARGING...';
            statusInfo.style = 'color: #fff; background: rgb(0, 255, 106);';
            activity = `
            <div class='activity'>
                <h3>Charged</h3>
                <p>${time}</p>
                <p>${Math.floor(data.level * 100)+ '%'}</p>
            </div>`;
        }
        else {
            state.textContent = 'DISCHARGED';
            statusInfo.style = 'color: #fff; background: rgb(255, 0, 85)';
            activity = `
            <div class='activity'>
                <h3>Discharged</h3>
                <p>${time}</p>
                <p>${Math.floor(data.level * 100) + '%'}</p>
            </div>`;
        }
        history.innerHTML += activity;
    }
    const updateLevel = () => {
        const lvl = Math.floor(data.level * 100);
        batteryPercent.textContent = lvl + '%';
        level.style.height = lvl + '%';
        if(lvl > 15 && lvl < 25) {
            level.style.background = 'orange';
        } else if(lvl > 25 && lvl < 35) {
            level.style.background = 'yellow';
        } else if(lvl > 35 && lvl <= 100) {
            level.style.background = 'rgb(6, 255, 139)';
        } else {
            level.style.background = 'red';
        }
    }
    updateLevel();
    data.onchargingchange = () => {
        updateBatteryState();
    }
    data.onlevelchange = () => updateLevel();
});