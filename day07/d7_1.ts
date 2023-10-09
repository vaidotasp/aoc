console.log(
	"---------------------------PROGRAM BEGIN-------------------------"
);
const textInput = await Deno.readTextFile(
	"/Users/vp/code/aoc2022/day07/input1.txt"
);
// const textInput = await Deno.readTextFile("./input1.txt");
const input = textInput.split("\n");

// $ signifies a command
// cd changes the dir
/*

cd means change directory. This changes which directory is the current directory, but the specific result depends on the argument:
cd x moves in one level: it looks in the current directory for the directory named x and makes it the current directory.
cd .. moves out one level: it finds the directory that contains the current directory, then makes that directory the current directory.
cd / switches the current directory to the outermost directory, /.
ls means list. It prints out all of the files and directories immediately contained by the current directory:
123 abc means that the current directory contains a file named abc with size 123.
dir xyz means that the current directory contains a directory named xyz.


determine the total size of each directory. The total size of a directory is the sum of the sizes of the files it contains, directly or indirectly.

To begin, find all of the directories with a total size of at most 100000, then calculate the sum of their total sizes. In the example above, these directories are a and e; the sum of their total sizes is 95437 (94853 + 584). (As in this example, this process can count files more than once!)

*/

// command parser

type FileNode = {
	name: string;
	size: number;
	parent: DirNode;
	children: null;
};

type DirNode = {
	name: string;
	size: number;
	parent?: DirNode | null; //null only is useful for the root but whatever
	children: Array<FileNode | DirNode>; // could be files or folders
};

type AnyNode = FileNode | DirNode;

class FileSystem {
	/*
		This will hold a filesystem information. It will be literally a tree node which each node representing a file or a directory. File can have a size, name and a parent directory. Directory can have a size, other directories and files.

		Likely best is linked list, question is if this should be single or double linked list. Double may be more flexible to look up parents and stuff.

		Is it true though? every directory can have multiple files as children and children cannot have any children only parent nodes (dirs)

		what about stack based implementation? I think that's possible but it seems more fun to do "tree" structure here

		fileSystem root node will be the root dir "/"

		every "dir" can have children (children can be other dirs),
		every "file" cannot have any children only parents


	*/

	root: DirNode;
	currentDirStack: string[];

	constructor() {
		const root = {
			name: "/",
			size: 0,
			children: [],
		} as DirNode;

		this.root = root;
		this.currentDirStack = ["/"];
	}

	updateStack(cmd: string | "..") {
		if (cmd === "..") {
			this.currentDirStack.pop();
		} else {
			this.currentDirStack.push(cmd);
		}
	}

	// traverse the tree and find directory node given a name. What if dir names are not unique and we can have nested dir names that are duplicates? We need to know the stack context within which we are looking for it.
	findDirNode(name: string, currentStack: string[]): DirNode | null {
		// no matter what dir name we have, we always have to traverse to the deepest stack folder that has been passed. Then within that folder we should be checking if dir exists and do nothing if it does, or create a new one if such dir does not exist
		const deepestCurrentDir = currentStack[currentStack.length - 1];
		const stackDepth = currentStack.length;
		// console.log("deepest dir", deepestCurrentDir, stackDepth);
		// console.log("current stack", currentStack);
		function traverse(curr: DirNode) {
			// console.log("traversing NODE name:", curr.name);
			for (let i = 0; i < curr.children.length; i++) {
				if (curr.children[i].children && stackDepth !== i) {
					traverse(curr.children[i] as DirNode);
					//current node has children (meaning it has nested files, keep going)
					//
				} else {
					//
					// console.log("reached deepest stack");
					break;
				}
			}
		}

		traverse(this.root); // start with root
		return null;
	}

	process(line: string) {
		const tokens = line.split(" ");

		if (tokens[0] === "$" && tokens[1] === "cd") {
			// cmd change dir, we need to either pop the stack or push the stack here
			this.updateStack(tokens[2]);
			// console.log(this.currentDirStack);
			return;
		} else if (tokens[0] === "$" && tokens[1] === "ls") {
			// TODO: list cmd, no stack updates, do we even perform any action here? I dont think so.
		} else if (tokens[0] === "dir") {
			// TODO: listing a directory, create if it does not exist, do nothing if it does
			const dirName = tokens[1];
			console.log(dirName);
			debugger;
			this.findDirNode(dirName, this.currentDirStack);
		} else {
			// the only left line is file listing, we should do the same -> create if it does not exist, do nothing if it does
			const fileSize = Number(tokens[0]);
			const fileName = tokens[1];
		}

		// what are we appending (dir or file?)
		// do we need to traverse to a specific node to perform the operation? if so how do we know where we are and where we go. I think we keep the stack of the current dir somewhere outside of this append method, we can try to do it here too. no reason why we cant do so.
	}
}

const fs = new FileSystem();

// ------------------ PARSING ------------------ //
function parseCommands(rawInput: string[]) {
	rawInput.forEach((line: string) => {
		fs.process(line);
	});
}
parseCommands(input);
console.log("---------");
// console.log(input);
