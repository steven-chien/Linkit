if(LinkitterList.find().count() === 0)
{
	LinkitterList.insert({
		username:"Alice Wong",
		picture:"/user/people1.png",
		birthday:"29 Mar 1945",
		Address:"Address 1",
		Email:"alice_wong@gmail.com",
		Phone:"95478484",
		website:"www.alice_wong.com"
	});
	LinkitterList.insert({
		username:"Amy Kwan",
		picture:"/user/people2.png",
		birthday:"11 Mar 1965",
		Address:"Address 1",
		Email:"amy_kwan@gmail.com",
		Phone:"95478484",
		website:"www.amy_kwan.com"
	}); 
	LinkitterList.insert({
		username:"Ben Poon",
		picture:"/user/people3.png",
		birthday:"22 Jan 1992",
		Address:"Address 1",
		Email:"ben_poon@gmail.com",
		Phone:"95478484",
		website:"www.ben_poon.com"
	});
	LinkitterList.insert({
		username:"Brain Tong",
		picture:"/user/people4.png",
		birthday:"31 Dec 1911",
		Address:"Address 1",
		Email:"brain_tong@gmail.com",
		Phone:"95478484",
		website:"www.brain_tong.com"
	});
	LinkitterList.insert({ 
		username:"Carrie Yip",
		picture:"/user/people5.png",
		birthday:"3 Oct 1992",
		Address:"Address 1",
		Email:"carrie_yip@gmail.com",
		Phone:"95478484",
		website:"www.carrie_yip.com"
	});
	LinkitterList.insert({
		username:"Cindy Wong",
		picture:"/user/people6.png",
		birthday:"3 Oct 1992",
		Address:"Address 1",
		Email:"cindy_wong@gmail.com",
		Phone:"95478484",
		website:"www.cindy_wong.com"
	});
	LinkitterList.insert({
		username:"Chris Kwan",
		picture:"/user/people6.png",
		birthday:"1 Mar 1992",
		Address:"Address 1",
		Email:"chris_wong@gmail.com",
		Phone:"95478484",
		website:"www.chriswong.com"
	});
}



if(pmtasks.find().count() === 0)
{
	pmtasks.insert( {
		name:"Start-term training",
		time:"2015-01-15 10:00:00",
		location:"PQ 606",
		assignedto:"Amy Kwan",
		Description:"This is start-term training."
	});
	pmtasks.insert({ 
		name:"Mid-term training",
		time:"2015-04-22 10:00:00",
		location:"PQ 506",
		assignedto:"Brain Tong",
		Description:"This is mid-term training."
	});
	pmtasks.insert({
		name:"End-term training",
		time:"2015-01-15 13:05:00",
		location:"Star One",
		assignedto:"Cindy Wong",
		Description:"This is end-term training."
	});
}

if(pmmeetings.find().count() === 0)
{
	pmmeetings.insert({
		name:"Kick-off meeting",
		time:"2015-10-22 22:30:00",
		location:"PQ 606",
		assignedto:"Amy Kwan",
		Description:"This is kick off training."
	});
	pmmeetings.insert({
		name:"General meeting",
		time:"2015-04-22 10:00:00",
		location:"QT 506",
		assignedto:"Brain Tong",
		Description:"This is general training."
	});
}