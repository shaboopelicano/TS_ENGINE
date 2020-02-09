import { TSE } from './core/engine';

var e = new TSE.Engine();

window.onload = () => {
    e.start();
}

window.onresize = () =>{
    e.resize();
}
