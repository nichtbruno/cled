
const getExportData = (klassen: Klasse[]) => {
    const data = {
        title: "New Project",
        klassen: klassen.map(klasse => {
            return {
                id: klasse.id,
                name: klasse.name,
                attributes: klasse.attributes,
                methodes: klasse.methodes,
                bgcolor: klasse.bgcolor,
                fgcolor: klasse.fgcolor,
            }
        })
    }
    return data;
}

export default getExportData;
