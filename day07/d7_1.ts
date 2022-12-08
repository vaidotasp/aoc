const textInput = await Deno.readTextFile("./input1.txt");
// console.log(textInput);

const input = textInput.split("\n");
// console.log(input);

class Node {
	name: string;
	parentDir: string | null;
	size: number;
	type: "file" | "dir";
	children: Node[] | null; //files do not have children as they are not folders and thus have no link

	constructor(
		name: string,
		size: number,
		type: "file" | "dir",
		parentDir: string | null,
		children: Node[] | [] | null
	) {
		this.name = name;
		this.size = size;
		this.type = type;
		this.parentDir = parentDir;
		this.children = children; //assume no children, unless specified
	}
}

class FileTree {
	root: Node;
	constructor() {
		this.root = new Node("/", 0, "dir", null, []); //init with the home dir that's empty
	}

	addNode(name: string, size: number, type: "file" | "dir", parentDir: string) {
		//find node that we are attaching file or folder to
		const parentNode = this.findDir(parentDir);
		// console.log("attaching to parent node: ", parentNode.name, parentNode.type);
		if (!parentNode.children) return;
		if (type === "dir") {
			const dirNode = new Node(name, 0, "dir", parentDir, []);
			parentNode.children.push(dirNode);
		} else {
			//deal with a file, create file and add it to parentDir children array
			const fileNode = new Node(name, size, "file", parentDir, null);
			parentNode.children.push(fileNode);
		}
	}

	traverseTree(node: Node, dirName: string) {
		//process
		if (!node?.children) return;
		if (node.type === "dir" && node.name === dirName) {
			return node;
		}
		for (let i = 0; i < node.children.length; i++) {
			this.traverseTree(node.children[i], dirName);
		}
	}

	findDir(dirName: string): Node {
		if (dirName === "e") {
			debugger;
		}
		console.log("finding", dirName);
		let foundNode = this.root;
		if (this.root.name === dirName) {
			return foundNode;
		}

		for (let i = 0; i < this.root!.children!.length; i++) {
			const ww = this.traverseTree(this.root!.children![i], dirName);
			if (ww) {
				console.log("found!!");
				foundNode = ww;
				break;
			} else {
				continue;
			}
		}
		return foundNode;
	}
}

// Process inputs/commands and build a tree
const ft = new FileTree();
let pwd = "/";
for (let i = 0; i < input.length; i++) {
	const lineOutput = input[i];
	if (lineOutput.includes("$") && lineOutput.includes("cd")) {
		const dir = lineOutput.split(" ")[2];
		console.log("changing dir from: ", pwd);
		//process dir changes first
		console.log("changing dir to: ", dir);
		if (dir === "..") {
			console.log("going up the dir!");
			console.log("current dir: ", pwd);
			console.log('if current is "e", then new should be "a"');
			// console.log("find directory with name", pwd);
			// console.log("find parent of that directory");
			const node = ft.findDir(pwd);
			console.log("node found", node);
			// console.log(pwd);
			// console.log(node);
			if (!node.parentDir) {
				//we are at the root dir already, nowhere to go up
				pwd = "/";
			} else {
				pwd = node.parentDir;
			}
		} else {
			pwd = dir;
		}
		console.log("changing dir to: ", pwd);
	} else {
		const fileFolderList: any = [];
		for (let j = i + 1; j < input.length; j++) {
			if (input[j].includes("cd")) {
				break;
			}
			fileFolderList.push(input[j]);
			i = j;
		}
		fileFolderList.forEach((fileFolder: string) => {
			const [sizeOrDir, fileName] = fileFolder.split(" ");
			if (sizeOrDir === "dir") {
				ft.addNode(fileName, 0, "dir", pwd);
			} else {
				ft.addNode(fileName, Number(sizeOrDir), "file", pwd);
			}
		});
		console.log(fileFolderList);
	}
	// console.log("process command", input[i]);
	// if (input[i].includes("cd")) {
	// 	const dir = input[i].split(" ")[2];
	// 	console.log(dir);
	// 	if (dir === "..") {
	// 		const node = ft.findDir(pwd);
	// 		if (!node.parentDir) {
	// 			//we are at the root dir already, nowhere to go up
	// 			pwd = "/";
	// 		} else {
	// 			pwd = node.parentDir;
	// 		}
	// 	} else {
	// 		pwd = dir;
	// 	}
	// }
	// if (input[i].includes("ls")) {
	// 	const fileFolderList: any = [];
	// 	//listing directories until either another "ls" or "cd" command
	// 	for (let j = i + 1; j < input.length; j++) {
	// 		if (input[j].includes("cd")) {
	// 			break;
	// 		}
	// 		fileFolderList.push(input[j]);
	// 		i = j;
	// 	}
	// 	fileFolderList.forEach((fileFolder: string) => {
	// 		const [sizeOrDir, fileName] = fileFolder.split(" ");
	// 		if (sizeOrDir === "dir") {
	// 			ft.addNode(fileName, 0, "dir", pwd);
	// 		} else {
	// 			ft.addNode(fileName, Number(sizeOrDir), "file", pwd);
	// 		}
	// 	});
	// 	//add files/folders to the tree and proceed
	// }
}

// Calculate each file size that belong to directory, show all dirs by size

const dirSizes = new Map();

//does this get total of the directory?
function getTotalSize(node: Node) {
	if (!node.children) return 0;
	let total = 0;
	if (node.children.length) {
		node.children.forEach((child) => {
			if (child.type === "file") {
				total += child.size;
			}
			if (child.type === "dir") {
				total += getTotalSize(child);
			}
		});
	}
	return total;
}

//traverse the tree, find all folders including nested ones and calculate the totals
function traverse(rootNode: Node) {
	if (rootNode.type === "dir" && rootNode.children) {
		const tt = getTotalSize(rootNode);
		dirSizes.set(rootNode.name, tt);
		rootNode.children.forEach((c) => traverse(c));
	}
}

traverse(ft.root);

console.log(JSON.stringify(ft));

console.log(dirSizes);

// let total = 0;
// for (const dir of dirSizes) {
// 	if (dir[1] <= 100000) {
// 		total += dir[1];
// 	}
// }

// console.log(total);

// function traverse(node: Node) {
// 	// console.log("processing...", node.name);
// 	// let total = 0;
// 	if (node.children) {
// 	}
// 	// return total;
// }

// const rootNode = ft.root;
// console.log(rootNode);
// console.log("tots,", traverse(rootNode!));

// const tt = ft.findDir("e");
// console.log(tt);

// console.log(dirSizes);

// let total = 0;

// for (const dir of dirSizes!) {
// 	// console.log(dir);
// 	//account for the fact that it may have
// 	const node = ft.findDir(dir[0]);
// 	if (dir[1] <= 100000) {
// 		total += dir[1];
// 	}
// }

// console.log(total);

// ft.findDir("temp");
// console.log(JSON.stringify(ft));

//traverse over input and build the actual tree, we will need to find sum sizes of all dirs, so adding files we will need to add (size, name)

//test case
