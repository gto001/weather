bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    basic.showString(data)
    basic.pause(2000)
    if (parseFloat(data) == 0) {
        pins.servoWritePin(AnalogPin.P0, 0)
    } else if (parseFloat(data) == 1) {
        pins.servoWritePin(AnalogPin.P0, 45)
    } else if (parseFloat(data) == 2) {
        pins.servoWritePin(AnalogPin.P0, 90)
    } else if (parseFloat(data) == 3) {
        pins.servoWritePin(AnalogPin.P0, 135)
    } else if (parseFloat(data) == 4) {
        pins.servoWritePin(AnalogPin.P0, 180)
    }
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    basic.showString(data)
    basic.pause(2000)
    if (parseFloat(data) <= 0) {
        pins.servoWritePin(AnalogPin.P1, 180 / 70 * (20 - Math.abs(parseFloat(data))))
    } else if (parseFloat(data) >= 0) {
        pins.servoWritePin(AnalogPin.P1, 180 / 70 * parseFloat(data))
    }
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    basic.showString(data)
    basic.pause(2000)
    if (parseFloat(data) <= 0) {
        pins.servoWritePin(AnalogPin.P2, 180 / 70 * (20 - Math.abs(parseFloat(data))))
    } else if (parseFloat(data) >= 0) {
        pins.servoWritePin(AnalogPin.P2, 180 / 70 * parseFloat(data))
    }
})
let data = ""
bluetooth.startUartService()
