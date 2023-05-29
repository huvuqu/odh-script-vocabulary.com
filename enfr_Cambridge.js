/* global api */
class enfr_Cambridge {
    constructor(options) {
        this.options = options;
        this.maxexample = 2;
        this.word = '';
    }

    async displayName() {
        let locale = await api.locale();
        if (locale.indexOf('CN') != -1) return '剑桥英法词典';
        if (locale.indexOf('TW') != -1) return '剑桥英法词典';
        return 'Cambridge EN->FR Dictionary';
    }

    setOptions(options) {
        this.options = options;
        this.maxexample = options.maxexample;
    }

    async findTerm(word) {
        this.word = word;
        return await this.findCambridge(word);
    }

    removeTags(elem, name) {
        let tags = elem.querySelectorAll(name);
        tags.forEach(x => {
            x.outerHTML = '';
        });
    }

    removelinks(elem) {
        let tags = elem.querySelectorAll('a');
        tags.forEach(x => {
            x.outerHTML = x.innerText;
        });

        tags = elem.querySelectorAll('h2');
        tags.forEach(x => {
            x.outerHTML = `<div class='head2'>${x.innerHTML}</div>`;
        });

        tags = elem.querySelectorAll('h3');
        tags.forEach(x => {
            x.outerHTML = `<div class='head3'>${x.innerHTML}</div>`;
        });
    }

    async findCambridge(word) {
        if (!word) return null;
        let notes = [];
        let expression = word;
        let reading = 'reading';
        // let base = 'https://dictionary.cambridge.org/search/english-french/direct/?q=';
        // let url = base + encodeURIComponent(word);
        // let doc = '';
        // try {
        //     let data = await api.fetch(url);
        //     let parser = new DOMParser();
        //     doc = parser.parseFromString(data, 'text/html');
        // } catch (err) {
        //     return null;
        // }
        //
        // let contents = doc.querySelectorAll('.pr .dictionary') || [];
        // if (contents.length == 0) return null;
        //
        // let definition = '';
        // for (const content of contents) {
        //     this.removeTags(content, '.extraexamps');
        //     this.removeTags(content, '.definition-src');
        //     this.removeTags(content, 'h2');
        //     this.removeTags(content, '.d_br');
        //     this.removeTags(content, '.freq.dfreq');
        //     this.removelinks(content);
        //     definition += content.innerHTML;
        // }
        // let css = this.renderCSS();
        // definition = 'dummy test'
        // return definition ? css + definition : null;
        let extrainfo = 'extrainfo';
        let audios = [];
        audios[0] = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(expression)}&type=1`;
        audios[1] = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(expression)}&type=2`;

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

        const desc_short =  document.querySelector('p.short').innerText;
        const desc_long =  document.querySelector('p.long').innerText;

        let definitions = [ 'test', 'test2' ];
        // const contents = doc.querySelectorAll('div.word-definitions > ol > li') || [];
        //
        // for (const content of contents) {
        //     // this.removeTags(content, '.expand-text');
        //     // this.removeTags(content, '.hide-text');
        //     // this.removeTags(content, '.expand-text');
        //     // definition += content.innerHTML;
        //     let pos = content.querySelector('div.pos-icon').title
        //     pos = pos ? `<span class="pos">${pos}</span>` : '';
        //
        // }
        // let css = this.renderCSS();
        // console.log(definition)

        let css = this.renderCSS();
        notes.push({
            css,
            expression,
            reading,
            extrainfo,
            definitions,
            audios
        });
    }

    renderCSS() {
        let css = `
            <style>
                span.star {color: #FFBB00;}
                span.cet  {margin: 0 3px;padding: 0 3px;font-weight: normal;font-size: 0.8em;color: white;background-color: #5cb85c;border-radius: 3px;}
                span.pos  {text-transform:lowercase; font-size:0.9em; margin-right:5px; padding:2px 4px; color:white; background-color:#0d47a1; border-radius:3px;}
                span.tran {margin:0; padding:0;}
                span.eng_tran {margin-right:3px; padding:0;}
                span.chn_tran {color:#0d47a1;}
                ul.sents {font-size:0.8em; list-style:square inside; margin:3px 0;padding:5px;background:rgba(13,71,161,0.1); border-radius:5px;}
                li.sent  {margin:0; padding:0;}
                span.eng_sent {margin-right:5px;}
                span.chn_sent {color:#0d47a1;}
            </style>`;
        return css;
    }
}
