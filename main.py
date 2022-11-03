bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    basic.pause(1)
    music.playTone(262, music.beat(BeatFraction.Quarter))
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (parseFloat(data) == 0) {
        pins.servoWritePin(AnalogPin.P0, 0)
        weather = 0
    } else if (parseFloat(data) == 1) {
        pins.servoWritePin(AnalogPin.P0, 45)
        weather = 1
    } else if (parseFloat(data) == 2) {
        pins.servoWritePin(AnalogPin.P0, 90)
        weather = 2
    } else if (parseFloat(data) == 3) {
        pins.servoWritePin(AnalogPin.P0, 135)
        weather = 3
    } else if (parseFloat(data) == 4) {
        pins.servoWritePin(AnalogPin.P0, 180)
        weather = 4
    } else {
    	
    }
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (parseFloat(data) <= 0) {
        pins.servoWritePin(AnalogPin.P1, 180 / 70 * (20 - Math.abs(parseFloat(data))))
    } else if (parseFloat(data) >= 0) {
        pins.servoWritePin(AnalogPin.P1, 180 / 70 * parseFloat(data))
    } else {
    	
    }
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (parseFloat(data) <= 0) {
        pins.servoWritePin(AnalogPin.P2, 180 / 70 * (20 - Math.abs(parseFloat(data))))
    } else if (parseFloat(data) >= 0) {
        pins.servoWritePin(AnalogPin.P2, 180 / 70 * parseFloat(data))
    } else {
    	
    }
})
let weather = 0
let data = ""
bluetooth.startUartService()
basic.forever(function () {
    images.createBigImage(`
        . . . . . . . . . .
        . . . . . . . . . .
        . . . . . . . . . .
        . . . . . . . . . .
        . . . . . . . . . .
        `).scrollImage(1, 200)
})
