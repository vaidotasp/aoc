console.log(
	"---------------------------PROGRAM BEGIN-------------------------"
);
const textInput = await Deno.readTextFile("./input2.txt");

const input = textInput.split("\n");

class Entry {
	name: string;
	size: number;
	children: Entry[] | null;
	constructor(name: string, size: number, children: Entry[] | null) {
		this.name = name;
		this.size = size;
		this.children = children;
	}
}

class FileTree {
	root: Entry;
	constructor() {
		this.root = new Entry("~", 0, []);
	}

	addEntry(entry: Entry, path: string) {
		//find where to attach the entry based on parent dir? and full path?
		// if we get the parent dir but within a tree we need to find the right one
	}

	getDirSizes() {
		this.root;
	}

	//recursive step through entries that may have nested children and find me a nested child specified by name
	traverse(node: Entry, name: string) {
		if (node.name === name) {
			return node;
		}
		if (node.children) {
			node.children.forEach((c) => this.traverse(c, name));
		}
		return null;
	}

	findParentDir(path: string): Entry {
		console.log("finddir", path);
	}

	addEntries(lines: string[], pwd: string) {
		console.log("adding lines to this PWD", pwd);
		console.log(lines);
		lines.forEach((l) => {
			const line = l.split(" ");
			let currNode = this.root;
			const paths = pwd.split("/");
			if (line[0] === "dir") {
				console.log("dealing with dir [%s] in path: [%s]", line[1], pwd);

				for (let i = 0; i < paths.length; i++) {
					const isLast = i === paths.length - 1;
					const foundNode = this.traverse(currNode, paths[i]);
					if (foundNode && isLast) {
						currNode = foundNode;
					} else if (foundNode && !isLast) {
						// currNode is at the root, but we need to go level deeper here
						const nested = currNode?.children?.find(
							(c) => c.name === paths[i + 1]
						);
						currNode = nested!;
					} else {
						// NOTE: we are assuming (which input suggest) that commands do not have misleading instructions like trying to cd into a dir that does not exist, so we are not handling such cases
					}
				}
				const node = new Entry(line[1], 0, []);
				currNode?.children?.push(node);
			} else {
				//dealing with the file part
				console.log("processing file", line[1], line[0]);
				for (let i = 0; i < paths.length; i++) {
					const isLast = i === paths.length - 1;
					const foundNode = this.traverse(currNode, paths[i]);
					if (foundNode && isLast) {
						currNode = foundNode;
					} else if (foundNode && !isLast) {
						// currNode is at the root, but we need to go level deeper here
						const nested = currNode?.children?.find(
							(c) => c.name === paths[i + 1]
						);
						currNode = nested!;
					} else {
						// NOTE: we are assuming (which input suggest) that commands do not have misleading instructions like trying to cd into a dir that does not exist, so we are not handling such cases
					}
				}
				const node = new Entry(line[1], Number(line[0]), null);
				currNode?.children?.push(node);
			}
		});
	}
}

const ft = new FileTree();

//
let pwd = "~";
for (let i = 0; i < input.length; i++) {
	const cmd = input[i];

	console.log(cmd, pwd);

	if (cmd === "$ cd ..") {
		if (pwd === "~") {
			continue;
		} else {
			const curPath = pwd.split("/");
			curPath.pop();
			pwd = curPath.join("/");
		}
	} else if (cmd.includes("cd")) {
		const dirName = cmd.split(" ")[2];
		pwd += `/${dirName}`;
	} else if (cmd === "$ ls") {
		const fileFolderList: any = [];
		for (let k = i + 1; k < input.length; k++) {
			if (input[k] === "$ cd .." || input[k].split(" ")[1] === "cd") {
				break;
			}
			fileFolderList.push(input[k]);
			i = k;
		}

		ft.addEntries(fileFolderList, pwd);
	}
}

console.log(ft.getDirSizes());


















