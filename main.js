class CodeClauseTimer{
    constructor(obj_num){
        
        this.addTimer = document.getElementById("addTimer")
        this.flag = true
        this.addTimer.style.display = "none"
        this.main = document.getElementById("main")
        this.obj_num = obj_num
        if(obj_num > 1){
            this.main.innerHTML += `<div id="t${obj_num}">
            HH:<input type="number" id="t${obj_num}h" min="00" value="00"/> MM:<input type="number" id="t${obj_num}m" min="00" max="60" value="00"/>SS:<input type="number" id="t${obj_num}s" min="00" max="60" value="00"><input type="button" value="start" id="startBtn${this.obj_num}"></div>
        </div>`
        }
        this.hh = document.getElementById("t" + obj_num + "h")
        this.mm = document.getElementById("t" + obj_num + "m")
        this.ss = document.getElementById("t" + obj_num + "s")
        this.startBtn = document.getElementById("startBtn" + obj_num)
        this.startBtn.addEventListener('click', ()=>{this.makeTimer()})
    }
    
    makeTimer() {
        document.getElementById(`t${this.obj_num}`).style.display = "none"
        // this.addTimer.style.display = "block"
        this.main.innerHTML += `<div style="display:flex"><div class="run" id="hh${this.obj_num}">${this.hh.value}</div> <span class="spans">:</span> <div class="run" id="mm${this.obj_num}">${this.mm.value}</div><span class="spans">:</span> <div class="run" id="ss${this.obj_num}">${this.ss.value}</div><input type="button" value="pause" id="control"/></div><div class="pgBar" id='pgBar${this.obj_num}'></div>`
        this.control = document.getElementById("control")
        this.control.addEventListener('click', ()=>{this.make_control()})
        this.hh = this.hh.value
        this.mm = this.mm.value
        this.ss = this.ss.value
        if(this.hh == "00"){
            this.hh = 0
        }
        if(this.mm == "00"){
            this.mm = 0
        }
        if(this.ss == "00"){
            this.ss = 0
        }
        this.totalSec = this.hh*60*60 + this.mm*60 + this.ss
        this.consumedSecs = 0
        this.bar = document.getElementById("pgBar" + this.obj_num)
        this.hhdiv = document.getElementById("hh" + this.obj_num)
        this.mmdiv = document.getElementById("mm" + this.obj_num)
        this.ssdiv = document.getElementById("ss" + this.obj_num)
        this.my_inter = setInterval(()=>{this.runTimer()}, 1000)
    }

    runTimer(){
        if(this.flag == true){
            this.modifyTimer()
        if(this.ss == 0)
        {
            if(this.mm == 0)
            {
                if(this.hh!=0){
                    this.hh = this.hh - 1
                    this.mm = 59
                }
                else{
                    clearInterval(this.my_inter)
                }
            }
            else{
                this.mm = this.mm-1
            }
            this.ss = 60
            
        }
        this.ss = this.ss - 1
        }
    }
    reduceBar(){
        this.consumedSecs += 1
        this.percNumber = this.totalSec - this.consumedSecs
        this.widthVal = (this.percNumber / this.totalSec) * 100
        this.bar.style.width = this.widthVal + "%"
        if(this.widthVal > 50){
            
        }
        else if(this.widthVal < 50 && this.widthVal > 25 ){
                this.bar.style.backgroundColor = "orange" 
        }
        else{
            this.bar.style.backgroundColor = "#ff7570"
        }
    }


    modifyTimer(){
        this.hhdiv.innerHTML = this.hh
        this.mmdiv.innerHTML = this.mm
        this.ssdiv.innerHTML = this.ss
        this.reduceBar()
    }

    make_control(){
        if(this.control.value == "pause"){
            this.flag = false
            this.control.value = "play"
            this.control.style.backgroundColor = "green"
        }
        else{
            this.flag = true
            this.control.value = "pause"
            this.control.style.backgroundColor = "#ff7570"
        }

    }
}
var obj_count = 1
var objects = []
objects[1] = new CodeClauseTimer(obj_count)

var addTimer = document.getElementById("addTimer")
addTimer.addEventListener('click', ()=>{addNew()})
function addNew()
{
    obj_count +=1
    objects[obj_count] = new CodeClauseTimer(obj_count)
}
