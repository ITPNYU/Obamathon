
 $(function(){
 		//usng jquery to fetch the .txt file located in the same directory
 		//pass txtFileWords into the function, save it in an a variable called array
        $.get("./exampleTextFile.txt", function(txtFileWords){
        	//give each word in the text file its own pair of quotes using split
            var array = txtFileWords.split(" ");
            //display result in an array:
            console.log(array);
            //display numeric value of result:
            console.log(array.length);
        });
    });
