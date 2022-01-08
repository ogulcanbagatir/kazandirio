
const Helper = {
  clamp: function(num,min,max){
    'worklet';
    if(num < min) return min
    if(num > max) return max
    return num
  },
  round: function(num ,min, max){
    'worklet';
    if(Math.abs(num - min) > Math.abs(max - num)){
      return max
    }
    return min
  },
  hexToRgbA: function(hex, opacity){
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
    }
  },
  uniqueRandom: function(prev, max){
    let rand = Math.floor(Math.random() * max)
    while(rand === prev){
      rand = Math.floor(Math.random() * max)
    }
    return rand
  },
  secondFormatter: function(second){
    let min = Math.floor((second / 60)).toFixed(0)
    let sec = (second % 60).toFixed(0)
  
    if(min.length == 1){
      min = '0' + min
    }
  
    if(sec.length == 1){
      sec = '0' + sec
    }
  
    return (min + ':' + sec) 
  },
  firstLetterUpperCase: function(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },
  scoreFormatter: function(score){
    if(score >= 1000000){
      return (score / 1000000).toFixed(1) + ' M'
    }else if(score >= 1000){
      return (score / 1000).toFixed(1) + ' K'
    }

    return score > 0 ? score.toFixed(0) : 0
  },
  shuffle: function(array){
    let currentIndex = array.length, randomIndex;
    
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}

module.exports = Helper
