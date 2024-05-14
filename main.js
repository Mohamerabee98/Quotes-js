var qouteMain = document.getElementById('quoteOutput')
var author = document.getElementById('authorOutput')



var Qoutes = [
    {
        author: '  ― Oscar Wilde',
        quote: '“Be yourself; everyone else is already taken.”'
     },
    {
        author: '― Mae West',
        quote: '“You only live once, but if you do it right, once is enough.”'
    },
    {
        author: ' ― Frank Zappa',
        quote: '“So many books, so little time.”'
    },
    {
        author: '― Marcus Tullius Cicero',
        quote: '“A room without books is like a body without a soul.”'
    },
    {
        author: ' ― Bernard M. Baruch.',
        'quote': "“Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.”"
    },
    {
        author: '― Dr. Seuss',
        quote: "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”"
    },


];

function Quote() {
    var random = Number.parseInt(Math.random() * Qoutes.length);
    qouteMain.textContent = `${Qoutes[random].quote}`;
    author.textContent = `${Qoutes[random].author}`;

}

