export class AppareilService {
    appareils = [
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
            appareil.status = "Allumé !!"
        }
    };
    switchOffAll() {
        for (let appareil of this.appareils) {
            appareil.status = "Eteint !!"
        }
    }
    switchOnOne(index: number) {
        this.appareils[index].status = "Allumé !!"
    };

    switchOffOne(index: number) {
        this.appareils[index].status = "Eteint !!"
    };

}