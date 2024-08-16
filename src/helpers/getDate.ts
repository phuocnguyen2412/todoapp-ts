const day : Array<string> = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]
const milisUtcToVnTime : number = 7 * 3600 * 1000;
const milisInOneDay : number = 24 * 3600 * 1000;

export const getNextDate = () : Date=> {
    const utc : Date = new Date();
    const vtc : Date = new Date( utc.getTime() + milisUtcToVnTime );
    const nextDate : Date = new Date( vtc.getTime() + milisInOneDay );

    return nextDate;
}