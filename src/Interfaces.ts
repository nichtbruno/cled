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
    bgcolor: string,
    fgcolor: string,
}

