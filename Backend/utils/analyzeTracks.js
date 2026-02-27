function analyzeTracks (topTracks, recentTracks) {

    let topArtistFrequency = {}
    let recentArtistFrequency = {};

    topTracks.items.forEach(item => {

        item.artists.forEach(artist => {

            const artistname = artist.name;

            if(topArtistFrequency[artistname]){
                topArtistFrequency[artistname] += 1
                
                
                

            } else {
                topArtistFrequency[artistname] = 1;
            }



            
            
        });
        
    });


    recentTracks.items.forEach(item => {
        item.track.artists.forEach(artist => {
            const artistname2 = artist.name;

            if(recentArtistFrequency[artistname2]) {
                recentArtistFrequency[artistname2] += 1
                
            } else {
                recentArtistFrequency[artistname2] = 1;
            }
        })
    })

    const topArtists= Object.entries(topArtistFrequency)
    .sort((a,b) =>  b[1] - a[1]).slice(0,3);

    


    const top = topArtists.map(([name,count]) => ({
        name,
        count
    }))


    let totalUniqueArtists = topArtists.length;
    let tastedepth

    if(totalUniqueArtists == 0) {
        tastedepth = "Unknown"

    } else if(totalUniqueArtists <= 2) {
        tastedepth = "Unique"

    } else if(totalUniqueArtists <= 5) {
        tastedepth = "Focused"

    } else {
        tastedepth = "Diverse"
    }

    const recentTrackLength = Object.entries(recentArtistFrequency).length;


    let activitylevel;

    if(recentTrackLength == 0){

        activitylevel = 'Inactive'

    } else if(recentTrackLength  < 10) {
        activitylevel = 'Low'

    } else if(recentTrackLength  > 10 || recentTrackLength < 30) {
        activitylevel = 'Active'

    } else {
        activitylevel = "Obsessed"
    }

    
    
    return {
      topArtist: {
     top,
     tastedepth,
     activitylevel

        
        
      }
    }
    
    

}

module.exports = { analyzeTracks }