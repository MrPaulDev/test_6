'use strict'


// create Data
// {key:[{},{},{}]...}
const company = {
	sales:[{
		id:1,
		name:'John',
		salary:210000,
	}, {
		id:2,
		name:'Lola',
		salary: 120000,
	}, 10],

	administation:{
		topManagers:[{
			id:3,
			name:'Paul',
			salary:210000000,
		}, {
			id:4,
			name:'Oleg',
			salary:120000000,
		}, ],

		administrators:[{
			id:5,
			name:'Kate',
			salary:120000,
		}, {
			id:6,
			name:'Alice',
			salary:102000,
		}, ],
	},

	accounting:[{
		id:7,
		name:'Olga',
		salary: 270000,
	}, {
		id:8,
		name:'Svetlana',
		salary: 190000,
	}, ],

	engineers:[{
		id:9,
		name:'John',
		salary:450000,
	}, ],
}

// [[{name:'BMW'},{},{}...], ...]
const cars_collection_v1 = [
	// BMW
	[{
		name:'BMW',
	}, {
		id:1,
		brand:'BMW',
		model:'x6',
		year:2021,
	},  {
		id:2,
		brand:'BMW',
		model:'x5',
		year:2021,
	},  {
		id:3,
		brand:'BMW',
		model:'3',
		year:2021,
	}, ],

	// Cadilac
	[{
		name:'Cadilac',
	}, {
		id:4,
		brand:'Cadilac',
		model:'Escalade',
		year:2021,
	},  {
		id:5,
		brand:'Cadilac',
		model:'Escalade',
		year:2020,
	},  {
		id:6,
		brand:'Cadilac',
		model:'Escalade',
		year:2019,
	}, ],

	// Toyota
	[{
		name:'Toyota',
	}, {
		id:7,
		brand:'Toyota',
		model:'lc200',
		year:2021,
	},  {
		id:8,
		brand:'Toyota',
		model:'lc100',
		year:2020,
	},  {
		id:9,
		brand:'Toyota',
		model:'Prada',
		year:2019,
	}, ],
]

// {brand:[{},{},{}] ...}
const cars_collection_v2 = {
	BMW: [{
		id:1,
		brand:'BMW',
		model:'x6',
		color: 'orange',
		year:2021,
	}, {
		id:2,
		brand:'BMW',
		model:'x5',
		year:2021,
	}, {
		id:3,
		brand:'BMW',
		model:'3',
		year:2021,
	}, ],

	Cadilac:[{
		id:4,
		brand:'Cadilac',
		model:'Escalade',
		color:'orange',
		year:2021,
	},  {
		id:5,
		brand:'Cadilac',
		model:'Escalade',
		year:2020,
	},  {
		id:6,
		brand:'Cadilac',
		model:'Escalade',
		year:2019,
	}, ],

	Toyota:[{
		id:7,
		brand:'Toyota',
		model:'lc200',
		color:'orange',
		year:2021,
	},  {
		id:8,
		brand:'Toyota',
		model:'lc100',
		year:2020,
	},  {
		id:9,
		brand:'Toyota',
		model:'Prada',
		year:2019,
	}, ],
}

// Clone	< --- >	Template	< --- >	Deep Clone
// partial	partial		partial
// full		full			full




//	Simple Clone << For in >>    breack continue return   condition's
// 1. Standart object's, changes : none
// 2. Property __proto__, changes : none
function scForIn(data, clone){
	(isArray(data)) ? clone = [] :
	(isObject(data)) ? clone = {} :
							clone = data;

	if(isArray(data)){
		data.forEach(item => clone.push(data))
	}

	else if(isObject(data)){
		for(let key in data)
			clone[key] = data[key]
	}

	return clone
}

// Simple Clone << For of >> breack continue return   condition's  Stretch(method symb)
// Create iterable object's
const symb = function(){
	return{
		keys: Object.keys(this),
		index: 0 ,
		next(){
			if(this.index < this.keys.length) return {done:false, value:this.keys[this.index++]}
			return {done:true}
		}
	}
}
function scForOf(data, clone){
	(isArray(data)) ? clone = [] :
	(isObject(data)) ? clone = {} :
							clone = data;
	
	if(isArray(data))
		data.forEach(item => clone.push(item))

	else if(isObject(data)){
		data[Symbol.iterator] = symb;
		for(let key of data)
			clone[key] = data[key]
	}

	
	return clone
}

// Simple Clone << For / While >> breack continue return   condition's Stretch(in cycle)
function scFor(data, clone){
	(isArray(data)) ? clone = [] :
	(isObject(data)) ? clone = {} :
							clone = data;

	if(isArray(data))
			data.forEach(item => clone.push(item))
	
	else if(isObject(data)){
		const keys = Object.keys(data)
		for(let index = keys.length; index--;){
			clone[keys[index]] = data[keys[index]]
		}
	}

	return clone
}


// Simple Clone << Universale >>  depth : level 2
function scUniversale(data, clone, wrap){
	(isArray(data)) ? clone = [] :
	(isObject(data)) ? clone = {} :
						clone = data;

	if(isArray(data)){
		data.forEach(item=> {
			if(isArray(item)){
				wrap = []
				item.forEach(i => {
					wrap.push(i)
				})
			}else if (isObject(item)){
				wrap = {}
				for(let key in item){
					wrap[key] = item[key]
				}
			}else{
				wrap = item
			}
			if(!isEmpty(wrap)) clone.push(wrap)
		})
	}else if(isObject(data)){
		for(let key in data){
			if(isArray(data[key])){
				wrap = []
				data[key].forEach(item =>{
					wrap.push(item)
				})
			}else if(isObject(data[key])){
				wrap = {}
				for(let k in data[key])
					wrap[k] = data[key][k]
			}else{
				wrap = data[key]
			}

			if(!isEmpty(wrap)) clone[key] = wrap
		}
	}

	return clone;
}



function isArray(data){
	return Array.isArray(data)
}
function isObject(data){
	return typeof data === 'object' && data !== null 
}
function isEmpty(data){
	return (isArray(data)) ? data.length === 0 :
			 (isObject(data)) ? Object.keys(data).length === 0 :
			 						 data === undefined

	// 	if(isArray(data)){
	// 	return data.length === 0
	// }else if(isObject(data)){
	// 	return Object.keys(data).length === 0
	// }else{
	// 	return data === undefined
	// }
}
function dataTypeIs(data){
	return (isArray(data)) ? 'array' :
			 (isObject(data)) ? 'object' :
			 (data === null) ? 'null':
			 				 typeof(data)
}

// Testing Simple Clone
{
// console.log(scForIn(company))
// console.log(company === scForIn(company))
// console.log(company['sales'] === scForIn(company)['sales'])

// console.log(scForOf(company))
// console.log(company === scForOf(company))
// console.log(company['sales'] === scForOf(company)['sales'])

// console.log(scFor(company))
// console.log(company === scFor(company))
// console.log(company['sales'] === scFor(company)['sales'])

// console.log(scUniversale(company))
// console.log(company === scUniversale(company))
// console.log(company['sales'] === scUniversale(company)['sales'])

// console.log(company['sales'][0] === scUniversale(company)['sales'][0])
}


// Recursion
// Recurrsion Traversal

// 1. Recursion Structure
// 2. Recursion base  (condition of exit)
// 3. Recursion depth (max call's in call - stack)
// 4. Recursion count (amount of call's)

// goal's : 1. Deep Clone; 2. Search by Condition's(+descriptor's); 3. Iteration's 4. Unpackage 5. Scan

// Deep Clone << Recursion >>
function deepClone(data, clone){
	(isArray(data)) ? clone = [] :
	(isObject(data)) ? clone = {} :
						clone = data;

	if(isArray(data))
		data.forEach(item =>{
			(isObject(item)) ? clone.push(deepClone(item)) : clone.push(item)
		})
	
	else if(isObject(data)){
		for(let key in data){
			(isObject(data[key])) ? clone[key] = deepClone(data[key]) : clone[key] = data[key]
		}
	}

	return clone;
}

// console.log(deepClone(company))
// console.log(company === deepClone(company))
// console.log(company['sales'][0] === deepClone(company)['sales'][0])

// Search By Condition << Recursion Traversal >>
function searchByConditions(data, condition, collection = []){

	if(isArray(data)){
		data.forEach(item =>{
			if(condition(item)){
				collection.push(item)
			}else if(isObject(item)){
				searchByConditions(item, condition, collection)
			}
		})
	}

	else if(isObject(data)){
		if(condition(data)){
			collection.push(data)
		}else{
			for(let key in data){
				if(isObject(data[key])) searchByConditions(data[key], condition, collection)
			}
		}
	}

	return collection
}

// Test Search By Conditions
{
const staff = searchByConditions(company, (current) =>{
	if(isObject(current))
		if('id' in current &&
			'name' in current &&
			'salary' in current)
				return true
	
	return false
})
// console.log(staff)

const budget = staff.reduce((total, person) =>{
	total += person.salary;
	return total;
}, 0)
// console.log(budget)


const descriptor = {
	symb:'O',
	minSalary: 2700000,
}

const persons = searchByConditions(company, (target)=>{
	if(isObject(target))
		if('name' in target)
			if(target.name.includes(descriptor.symb))
				if(target.salary > descriptor.minSalary)
					return true

	return false;
})

// console.log(persons)

const descriptor_cars = {
	color:'orange',
	year:2021,
}

const result = searchByConditions(cars_collection_v2, (curent)=>{
	for(let key in descriptor_cars){
		if(!(key in curent)) return false
		if(descriptor_cars[key] !== curent[key]) return false
	}

	return true
})

// console.log(result)
}


// Recursive iteration's
function recursiveIteration(data, action){

	if(isArray(data)){
		data.forEach((item, index) => {
			(isObject(item)) ? recursiveIteration(item, action) : action(data, index) 
		})
	}

	else if(isObject(data)){
		for(let key in data)
			(isObject(data[key])) ? recursiveIteration(data[key], action) : action(data, key) 
	}

}

{
// recursiveIteration(company, (data, key)=>{
// 	console.log(`${key}   ${data[key]}`)
// })

// recursiveIteration(company, (data, key) =>{
// 	if(key === 'id')
// 		data[key] += 'staff';
// })
}

// Recursive Scan
function Scan(data, collection = []){

	if(isArray(data)){
		collection.push(data)
		data.forEach(item =>{
			(isObject(item)) ? Scan(item, collection) : collection.push(item)
		})
	}

	else if(isObject(data)){
		collection.push(data)
		for(let key in data){
			(isObject(data[key])) ? Scan(data[key], collection) : collection.push(data[key])
		}
	}

	return collection
}

console.log(Scan(company))