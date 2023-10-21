class Modular {
    constructor (cb) {        
        Modular.instance = Modular.instance ?? cb();
        return Modular.instance;
    }
}

export default Modular;