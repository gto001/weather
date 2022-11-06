bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    basic.showString(data)
    num = parseFloat(data)
    if (num == 0) {
        pins.servoWritePin(AnalogPin.P0, 0)
    } else if (num == 1) {
        pins.servoWritePin(AnalogPin.P0, 40)
    } else if (num == 2) {
        pins.servoWritePin(AnalogPin.P0, 85)
    } else if (num == 3) {
        pins.servoWritePin(AnalogPin.P0, 115)
    } else if (num == 4) {
        pins.servoWritePin(AnalogPin.P0, 175)
    }
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    basic.showString(data)
    num = parseFloat(data)
    if (num <= -15) {
        pins.servoWritePin(AnalogPin.P1, 180)
    } else if (num >= 45) {
        pins.servoWritePin(AnalogPin.P1, 0)
    } else {
        pins.servoWritePin(AnalogPin.P1, 180 - (15 + num) * 3)
    }
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    basic.showString(data)
    num = parseFloat(data)
    if (num <= -15) {
        pins.servoWritePin(AnalogPin.P2, 0)
    } else if (num >= 45) {
        pins.servoWritePin(AnalogPin.P2, 180)
    } else {
        pins.servoWritePin(AnalogPin.P2, 180 - (15 + num) * 3)
    }
})
let num = 0
let data = ""
bluetooth.startUartService()
pins.servoWritePin(AnalogPin.P0, 0)
pins.servoWritePin(AnalogPin.P1, 0)
pins.servoWritePin(AnalogPin.P2, 0)
