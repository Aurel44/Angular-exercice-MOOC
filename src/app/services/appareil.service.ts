import { Subject } from "rxjs/Subject";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class AppareilService {

    appareilSubject = new Subject<any[]>();

    private appareils: any[] = [] ;

    constructor(private httpClient: HttpClient) { }

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

    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;

        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
        this.httpClient
            .put('https://http-client-demo-92278-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
            .subscribe(
                () => {
                    console.log("Enregistrement terminé !!");
                },
                (error) => {
                    console.log("Erreur de Sauvegarde ...." + error)
                }
            )

    }
    getAppareilsFromServer() {
        this.httpClient
            .get<any[]>('https://http-client-demo-92278-default-rtdb.europe-west1.firebasedatabase.app/appareils.json')
            .subscribe(
                (response) => {
                    console.log(response);
                    this.appareils = response;
                    this.emitAppareilSubject();
                },
                (error) => {
                    console.log("Erreur de DownLoad ...." + error)
                }
            )
    }
}