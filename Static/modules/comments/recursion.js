var comments =  [
    {id:'1',parent:null,child:true},
    {id:'2',parent:null,child:true},
    {id:'3',parent:null,child:true},
     {id:'4',parent:null,child:false},
    {id:'1-1',parent:'1',child:true},
    {id:'1-2',parent:'2',child:true},
    {id:'1-3',parent:'3',child:true},
    {id:'1-1-1',parent:'1-1',child:false},
    {id:'1-1-2',parent:'1-2',child:false},
    {id:'1-1-3',parent:'1-3',child:false}
];


var result = [];

for (var i =0; i< comments.length; i++){
    if(!comments[i].reply){
        if(comments[i].parent === null){
            result.push(comments[i]);
            comments.splice(i, 1);
            i--;
        }else {
            findParent(comments,comments[i].parent,comments[i]);
            comments.splice(i,1);
            i--
        }
    }
//    if(comments[i].parent === null){
//        result.push(comments[i]);
//        comment.splie(i,1);
//        i--;
//    }
}


function findParent(array,parentId,comment) {
          var winner;
          for(var i =0; i < array.length; i++) {
            if(array[i].id === parentId) {
                array[i]['child'] = array[i]['child'] || [];
                array[i].child.push(comment);
                if(comments[i].parent !== null){
                    return findParent(comments,comments[i].parent,comments[i])
                }
               //return array[i];
            }


        }
}


