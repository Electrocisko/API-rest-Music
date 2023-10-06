import NodeID3 from "node-id3";




let file2 = "./src/uploads/songs/1696078484248-ns_remix.mp3"

// NodeID3.read(file, function(err, tags) {
//     if (err) console.log(err);
//     console.log(tags)
// })


const datos =  (archivo) => {
    NodeID3.read(archivo,  function(err, tags) {
        if (err) console.log(err);

        //  let dataMp3 = {
        //     title : tags.title,
        //     artist: tags.artist,
        //  }
         
        return console.log(tags)
    })
}

datos(file2)






export default datos;
