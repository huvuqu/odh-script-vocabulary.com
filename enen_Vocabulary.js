Class enen_Vocabulary{
    constructor() {
        this.word = '';
    }

    async displayName() {
        return "Vocabulary EN->EN";
    }

    async findTerm(word) {
        this.word = word;
        return await this.findVocabulary(word);
    }

    async findVocabulary(word) {
        if (!word) return null;
        const base = 'https://www.vocabulary.com/dictionary/';
        const url = base + encodeURIComponent(word);
        let doc = '';
        try {
            let data = await api.fetch(url);
            let parser = new DOMParser();
            doc = parser.parseFromString(data, "text/html");
        } catch (err) {
            return null;
        }
        let definition = '';
        const contents = doc.querySelectorAll('li > div.definition') || [];

        for (const content of contents) {
            definition += content.innerText;
        }

        let css = this.renderCSS();
        return definition ? definition + css : null;
    }

    renderCSS() {
        let css = `
            <style>
            .entry-body__el{margin-bottom:10px;}
            .head2{font-size: 1.2em;font-weight:bold;}
            .pos-header{border-bottom: 1px solid;}
            .head3 {display:none;}
            .posgram {font-size: 0.8em;background-color: #959595;color: white;padding: 2px 5px;border-radius: 3px;}
            .epp-xref::after {content: ")";}
            .epp-xref::before {content: "(";}
            .def-block, .phrase-block {
                /*border: 1px solid;*/
                /*border-color: #e5e6e9 #dfe0e4 #d0d1d5;*/
                border-radius: 3px;
                padding: 5px;
                margin: 5px 0;
                background-color: #f6f6f6;
            }
            .phrase-block .def-block{border: initial;padding: initial;}
            p.def-head {margin: auto;}
            .phrase-head {vertical-align: middle;color: #1683ea;font-weight: bold;}
            .trans {color: #5079bb;}
            </style>`;
}
