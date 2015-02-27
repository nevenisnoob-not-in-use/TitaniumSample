var n = 1;
search: while (true) {
    // these loops are just a "busy work" loop, alternative to setTimeout to avoid sleeping
    var t = 0;
    for (var j=0;j<1; j++){
        for( var i=0;i<=999999999; i++ ){ 
            t=i;
        }
    }
  // the following code calculates prime numbers
  n += 1;
  for (var i = 2; i <= Math.sqrt(n); i += 1)
    if (n % i == 0)
      continue search;
  // found a prime!
  postMessage(n);
}