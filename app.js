const Discord = require("discord.js");
const fs = require("file-system");
const sleep = require("system-sleep");
const client = new Discord.Client();
const token = 'Mjg5MjE3MDY3Njg3ODcwNDc1.DRGIjw.PGFU531HBB7lpH-ISoz9FNU9Hvc'

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

var lastChannel;

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
  	} else if(msg.content.includes('voice')){
  		if(msg.content.includes('leave')){
  			//console.log(client.voiceConnections.first().channel.id);
  			//if(client.voiceConnections.find('id',msg.member.voiceChannel.id)){
  			//	msg.reply('Leaving');
  				client.voiceConnections.first().disconnect();
  			//}
		} else if(msg.member.voiceChannel) {
		      msg.member.voiceChannel.join()
		        .then(connection => { // Connection is an instance of VoiceConnection
		       	  doVoiceStuff(connection);
		          msg.reply('I have successfully connected to the channel!');
		        })
		        .catch(console.log);
		  	}
  	} else{
  		res = getRandMessage(main);
  	}
  	if(res){
  	  	console.log('=====' + res);
    	msg.channel.send(res);
    	lastChannel = msg.channel;
	}
  } else if (msg.author.id!=client.user.id && msg.author.id!=172002275412279296 && msg.author.id != 184405311681986560) {
  	console.log(msg.content);
  	learnBlock(msg.content,main);
  }
  if(msg.author.id==2){
  	//var uni = "🇦🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿";
  	var a = 127462;
  	var mea = "ihateyou"
  	for(var i =0; i<mea.length; i++){
  		sleep(750);
  		msg.react(String.fromCodePoint(127462+(mea.charCodeAt(i)-97)));  		
  	}
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
	message = clean(message);
	if(message.length<=0){
		return;
	}
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


function clean(str){
	str = str.replace(/http\S+/g,"");
	str = str.replace(/>>\d+/g,"");
	str = str.replace(/\.chan\s*\w*/g,"");
	str = str.replace(/t!.*/g,"");
	str = str.replace(/\/\S+/g,"");
	return str;
}

learnFile("data/flirt.txt", flirt);
learnFile("data/bible.txt", bible);
learnFile("data/jarod.txt", jarod);
learnFile("data/truth.txt", truth);
learnFile("data/dare.txt", dare);





// human input 

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
  lastChannel.send(line);
});



// voice stuff
function doVoiceStuff(connection){
	const dispatcher = connection.playFile('data/deep.mp3');
	dispatcher.on('end', () => {
	  // The song has finished
	});

	dispatcher.on('error', e => {
	  // Catch any errors that may arise
	  console.log(e);
	});

	//dispatcher.setVolume(0.5); // Set the volume to 50%
	//dispatcher.setVolume(1); // Set the volume back to 100%

	//console.log(dispatcher.time); // The time in milliseconds that the stream dispatcher has been playing for

	//dispatcher.pause(); // Pause the stream
	//dispatcher.resume(); // Carry on playing

	//dispatcher.end(); // End the dispatcher, emits 'end' event
}