
export default function detailedDataConstructor(itemsId, main) {
    
    const existing = main.querySelector('.detailedData');
    if (existing) existing.remove();  

    let detailedData = document.createElement("div");
    detailedData.classList.add('detailedData');
    main.appendChild(detailedData);

    let dDLeft = document.createElement('div');
    let dDRight = document.createElement('div');
    dDLeft.classList.add('dDLeft');
    dDRight.classList.add('dDRight');
    
    // dDLeft

    let descriptionTitle = document.createElement('h3');
    descriptionTitle.innerText = 'Description:';
    let descriptionTitleDiv = document.createElement('div');
    descriptionTitleDiv.appendChild(descriptionTitle);
    descriptionTitleDiv.classList.add('descriptionTitleDiv');
    dDLeft.appendChild(descriptionTitleDiv);

    let descriptionContent = document.createElement('p');
    descriptionContent.innerText = itemsId[0].snippet.description || 'No description for channel.';
    let descriptionContentDiv = document.createElement('div');
    descriptionContentDiv.appendChild(descriptionContent);
    descriptionContentDiv.classList.add('descriptionContentDiv');
    dDLeft.appendChild(descriptionContentDiv);

    detailedData.appendChild(dDLeft);
    
    // dDRight

    let idChannel = itemsId[0].id;
    let channelCountry = itemsId[0].snippet.country;
    let defaultLanguage = itemsId[0].snippet.defaultLanguage;

    let arrMoreDetails = [
                            [idChannel, "Channels id:"], 
                            [channelCountry, "Channels country:"],
                            [defaultLanguage, "Channels default language: "]
                        ];

    for (let stat of arrMoreDetails) {
        let statDiv = document.createElement('div');
        
        if (stat[0] === undefined) {
            stat[0] = "Not specified by channel";
        }

        let statElh4 = document.createElement('h4');
        statElh4.innerText = stat[1];

        let statElp = document.createElement('p');
        statElp.innerText = stat[0];

        statDiv.appendChild(statElh4);
        statDiv.appendChild(statElp);
        dDRight.appendChild(statDiv);

        statDiv.classList.add('statDiv');
    }

    detailedData.appendChild(dDRight);
    
}