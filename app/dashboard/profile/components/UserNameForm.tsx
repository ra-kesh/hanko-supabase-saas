import { buttonVariants } from "@/components/button/Button.component";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UserNameForm = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    async function getUserDetails() {
      const response = await fetch("/api/user");

      if (!response.ok) {
        toast.error("could not fetch user details");
      }

      const { user } = await response.json();

      setName(user?.name ?? "");
    }
    getUserDetails();
  }, []);

  async function updateUserName(): Promise<void> {
    const response = await fetch(`/api/user`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      toast.error("your name could not be updated");
      return;
    }

    const { user } = await response.json();

    setName(user?.name);
  }

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    toast.promise<void>(updateUserName(), {
      loading: "Updating your name",
      success: "Your name updated successfully",
      error: "Failed to update your name ",
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="rounded-md border p-6 grid gap-6">
        <div className="flex flex-col space-y-2">
          <h3 className="text-2xl font-bold">Your Name</h3>
          <p className="">Please enter a name you are comfortable with.</p>
        </div>
        <div className=" grid gap-6">
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex h-8 w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none"
          />
          <div>
            <button type="submit" className={cn(buttonVariants())}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserNameForm;
