interface Attribute {
    id: number,
    name: string,
}

interface Methode {
    id: number,
    name: string,
}

interface Klasse {
    id: number,
    name: string,
    attributes: Attribute[],
    methodes: Methode[],
    color: {
        bgcolor: string,
        fgcolor: string,
    },
    // position: {
    //     startX: number,
    //     startY: number,
    //     lastX: number,
    //     lastY: number,
    // },
}

