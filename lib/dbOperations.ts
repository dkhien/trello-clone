import { ID, databases, storage} from "@/appwrite"

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const TODOS_COLLECTION_ID = process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!;
const IMAGES_STORAGE_ID = process.env.NEXT_PUBLIC_IMAGES_STORAGE_ID!;

export const getTodosGroupedByColumn = async () => {
    //Get data from Appwrite database
    const data = await databases.listDocuments(
        DATABASE_ID,
        TODOS_COLLECTION_ID
    );
    const todos = data.documents;

    //Turn response into map of column type to list of todos
    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }
        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            //Get image if exist in todo
            ...(todo.image && {image: JSON.parse(todo.image)})
        })
        return acc;
    }, new Map<TypedColumn, Column>())

    //Columns map need to have all three keys to display three columns in UI
    //If column type hasnt exist as key in columns map, add it with empty todos list
    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: []
            })
        }
    }

    //Sort columns based on columnTypes
    //So that every time we revisit the website, data is displayed in the same order (todo -> inprogress -> done)
    const sortedColumns = new Map(
        Array.from(columns.entries()).sort((a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]))
    )
    
    const board: Board = {
        columns: sortedColumns
    }

    return board;
}


export const updateTaskInDB = async (task: Task, column : TypedColumn) => {
    await databases.updateDocument(
        DATABASE_ID,
        TODOS_COLLECTION_ID,
        task.$id,
        {
            title: task.title,
            status: column
        }
    )
}

export const deleteTaskInDB = async (task: Task) => {
    await databases.deleteDocument(
        DATABASE_ID,
        TODOS_COLLECTION_ID,
        task.$id
    )
}

export const addNewTaskToDB = async (title: string, columnId: TypedColumn, image?: File | null) => {
    try {
      let imageID = "";
      
      if (image) {
        // Upload the image to the Appwrite storage
        imageID = ID.unique();
        const file = await storage.createFile(IMAGES_STORAGE_ID, imageID, image);
        imageID = file.$id;
      }
      console.log(image)
      console.log(imageID)
      // Create a new document in the Appwrite database
      await databases.createDocument(DATABASE_ID, TODOS_COLLECTION_ID, ID.unique(), {
        title: title,
        status: columnId,
        image: imageID ? JSON.stringify({ bucketId: IMAGES_STORAGE_ID, fileId: imageID }) : "", 
      });
    } catch (error) {
      console.error("Error adding task to database:", error);
    }
  };


  export const getImageViewFromDB = async (image: Image): Promise<string> => {
    try {
      const imageURL = await storage.getFilePreview(image.bucketId, image.fileId);
      return imageURL.toString();
    } catch (error) {
      console.error('Error fetching image view from the database:', error);
      throw error; 
    }
  };
  
  