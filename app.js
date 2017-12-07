const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const token = 'Mjg5MjE3MDY3Njg3ODcwNDc1.DQSJKQ.B8iM22O0rh1iJSFvZM-5us0qZqE'

var main = new Map();
main.set(true,[]);

var flirt = new Map();
flirt.set(true,[]);

var bible = new Map();
bible.set(true,[]);

var jarod = new Map();
jarod.set(true,[]);

var truth = new Map();
truth.set(true,[]);

var dare = new Map();
dare.set(true,[]);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

console.log('Bot Started!');

client.on('message', msg => {
  if (msg.content.includes('markov')) {
  	var res = '';
  	var target = msg.mentions.users.first();
  	if(target == null){
  		target = msg.author;
  	}
  	if(msg.content.includes('flirt')){
  		res = target.toString() + getRandMessage(flirt);
  	} else if(msg.content.includes('bible') || msg.content.includes('God')){
  		res = getRandMessage(bible);
  	} else if(msg.content.includes('marx') || msg.content.includes('communism')){
  		res = getRandMessage(jarod);
  	} else if(msg.content.includes('truth')){
  		res = target.toString() + getRandMessage(truth);
  	} else if(msg.content.includes('dare')){
  		res = target.toString() + getRandMessage(dare);
  	}
  	else{
  		res = getRandMessage(main);
  	}
  	console.log('=====' + res);
    msg.channel.send(res);
  } else if (msg.author.id!==client.user.id) {
  	console.log(msg.content);
  	learnBlock(msg.content,main);
  }
});

client.login(token);


function randWord(word, m){
	return m.get(word)[parseInt(Math.random() * m.get(word).length)];  // Conciseness is more important than readability. 
}

function learnBlock(block, m){
	var lines = block.split(/\n|\r\n/); // its still BS that we haven't standarized on a newline character
  	for(var i = 0; i < lines.length; i++){
  		learn(lines[i], m);
  	}

}


function learn(message, m){
  	//var words = message.split(/\s|(?<=\W+)(?!\W+)|(?<!\W+)(?=\W+)/); //Perl gives me headaches
  	var words = message.split(/\s|(?<=[0-9!@#$%^&*()\-_+={},.~`<>\/\\";:])(?![0-9!@#$%^&*()\-_+={},.~`<>\/\\";:])|(?<![0-9!@#$%^&*()\-_+={},.~`<>\/\\";:>])(?=[0-9!@#$%^&*()\-_+={},.~`<>\/\\";:])/); //Perl gives me headaches
  	var lastWord = true;
  	for (var i = 0; i < words.length; i++){
  		if(!m.has(lastWord)){
  			m.set(lastWord,[]);
  		}
  		m.get(lastWord).push(words[i]);

  		lastWord = words[i];
  	}
  	if(!m.has(lastWord)){
  			m.set(lastWord,[]);
  		}
  	m.get(lastWord).push(false);
}

function getRandMessage(m){
	 var res = "";
    var lastWord = randWord(true, m);
    while(lastWord !== false){
    	if(lastWord.match(/^\w/)){
    		res = res + " ";
    	}
    	res = res + lastWord;
    	lastWord = randWord(lastWord, m);
    }
    return res;
}

function learnFile(name, list){
	fs.readFile(name, (err, data) => {
 		if (err) throw err;
		learnBlock(""+data, list);
	});
}

learnFile("data/flirt.txt", flirt);
learnFile("data/bible.txt", bible);
learnFile("data/jarod.txt", jarod);
learnFile("data/truth.txt", truth);
learnFile("data/dare.txt", dare);