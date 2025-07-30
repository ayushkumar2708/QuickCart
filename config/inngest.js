import { Inngest } from "inngest";
import connectDB from "./db";
import { User } from "@clerk/nextjs/dist/types/server";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//inngest function to save user data to a databse
export const syncUserCreation = inngest.createFunction(
{
id:'sync-user-from-clerk'
},
{ event: 'clerk/user.created'},
async ({event}) => {
      const { id, first_name, last_name, email_addresses, image_url } = event.data
      const userdata = {
        _id:id,
        email: email_addresses[0].email_address,
        name: first_name + ' ' + last_name,
        imageUrl: imageurl
      }
      await connectDB()
      await User.create(userdata)
}
) 

// Inngest Function to update user data in database
export const syncUserupdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk',
    },
    { event: 'clerk/user.updated' },
    async ({event}) => {
     const { id, first_name, last_name, email_addresses, image_url } = event.data
      const userdata = {
        _id:id,
        email: email_addresses[0].email_address,
        name: first_name + ' ' + last_name,
        imageUrl: imageurl
      }
      await connectDB()
      await User.findbyIdAndUpdate(id, userdata)
    }
)

//Ingest Function to delete user from database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk',
    },
    { event: 'clerk/user.deleted' },
async ({event}) => {
    const {id } = event.data
 await connectDB()
      await User.findbyIdAndDelete(id)
    }
)