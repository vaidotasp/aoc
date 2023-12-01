console.log(
  "---------------------------PROGRAM BEGIN-------------------------"
);
const textInput = await Bun.file(
  "/Users/vp/code/projects/aoc2022/day07/input1.txt"
).text();
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

type Node = {
  name: string;
  size: number;
  children?: Node[];
};

class FileSystem {
  root: Node;
  currentDirStack: string[];

  constructor() {

    const root = {
      name: "/",
      size: 0,
      children: []
    }
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

  addDir(dirName: string) {
    function traverse(node: Node, pathName: string): Node | null {
      if (node.name === pathName) {
        return node;
      } else if (node.children) {
``        const res = node.children.forEach(c => traverse(c, dirName));
        if (res) {
          return res
        }
      }
      return null;
    }

    // let currentNode = this.root;
    // for (let i = 0; i < this.currentDirStack.length; i++) {
    //   const foundDirInPath = traverse(currentNode, this.currentDirStack[i]);
    //   console.log(this.currentDirStack[i], foundDirInPath?.name);
    //   const deepest = i === this.currentDirStack.length - 1;
    //   debugger;
    //   if (deepest && foundDirInPath) {
    //     const child = foundDirInPath.children.find(c => c.name === dirName);
    //     if (!child) {
    //       const node = {
    //         name: dirName,
    //         size: 0,
    //         children: []
    //       };
    //       foundDirInPath.children.push(node);
    //       break;
    //     }
    //   } else {
    //     currentNode = foundDirInPath
    //     continue;
    //   }
    // }
  }

  process(line: string) {
    const tokens = line.split(" ");
    if (tokens[0] === "$" && tokens[1] === "cd") {
      // cmd change dir, we need to either pop the stack or push the stack here
      this.updateStack(tokens[2]);
      return;
    } else if (tokens[0] === "$" && tokens[1] === "ls") {
      // TODO: list cmd, no stack updates, do we even perform any action here? I dont think so.
    } else {
      if (tokens[0] === "dir") {
        this.addDir(tokens[1]);
        // create directory with the name of tokens[1], if it does not exist in current path
      } else {
        // dealing with file tokens[0] size and tokens[1] name, create file if it does not exist in current path
      }
    }
  }
}


const fs = new FileSystem();

// ------------------ PARSING ------------------ //
function parseCommands(rawInput: string[]) {
  rawInput.slice(0, 10).forEach((line: string) => {
    fs.process(line);
  });
}
parseCommands(input);

console.log(JSON.stringify(fs));
