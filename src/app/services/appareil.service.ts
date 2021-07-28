import { Subject } from "rxjs/Subject";

export class AppareilService {

    appareilSubject = new Subject<any[]>();

    private appareils = [
        {
            id: 1,
            name: "Machine à Laver",
            status: "Eteint !!"
        },
        {
            id: 2,
            name: "Télevision",
            status: "Allumé !!"
        },
        {
            id: 3,
            name: "Ordinateur",
            status: "Eteint !!"
        }
    ];

    emitAppareilSubject() {
        this.appareilSubject.next(this.appareils.slice());
    }

    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (appareilObject) => {
                return appareilObject.id === id;
            }
        );
        return appareil;
    };

    switchOnAll() {
        for (let appareil of this.appareils) {
            appareil.status = "Allumé !!";
        }
        this.emitAppareilSubject();
    };
    switchOffAll() {
        for (let appareil of this.appareils) {
            appareil.status = "Eteint !!";
        }
        this.emitAppareilSubject();
    }
    switchOnOne(index: number) {
        this.appareils[index].status = "Allumé !!";
        this.emitAppareilSubject();
    };

    switchOffOne(index: number) {
        this.appareils[index].status = "Eteint !!";
        this.emitAppareilSubject();
    };

    addAppareil(name: string,status: string){
        const appareilObject = {
            id : 0,
            name:'',
            status:''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length -1)].id + 1;
        
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }
}