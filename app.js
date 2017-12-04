const Discord = require("discord.js");
const client = new Discord.Client();
const token = 'Mjg5MjE3MDY3Njg3ODcwNDc1.DQSJKQ.B8iM22O0rh1iJSFvZM-5us0qZqE'

var m = new Map();
m.set(true,[]);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

console.log('Bot Started!');

client.on('message', msg => {
  if (msg.content.includes('markov')) {
  	var res = getRandMessage();
  	console.log("===="+res);
    msg.channel.send(res);
  }else if (msg.author.id!==client.user.id){
  	console.log(msg.content);
  	var lines = msg.content.split(/\n|\r\n/); // its still BS that we haven't standarized on a newline character
  	for(var i = 0; i < lines.length; i++){
  		learn(lines[i]);
  	}
  }
});

client.login(token);


function randWord(word){
	return m.get(word)[parseInt(Math.random() * m.get(word).length)];  // Conciseness is more important than readability. 
}

function learn(message){
  	var words = message.split(/\s|(?<=\W+)(?!\W+)|(?<!\W+)(?=\W+)/); //Perl gives me headaches
  	var lastWord = true;
  	for (var i = 0; i < words.length; i++){
  		//console.log(words[i])
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

function getRandMessage(){
	 var res = "";
    var lastWord = randWord(true);
    while(lastWord !== false){
    	if(lastWord.match(/^\w/)){
    		res = res + " ";
    	}
    	res = res + lastWord;
    	lastWord = randWord(lastWord);
    }
    return res;
}