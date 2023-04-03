import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";

type Room = {
  id: string;
  name: string;
};

const Rooms = () => {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("/api/rooms/getRooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
    console.log(rooms);
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/rooms/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: roomName }),
    });

    if (response.ok) {
      const newRoom = await response.json();
      console.log(newRoom);
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    }

    setRoomName("");
  };

  return (
    <div>
      <h1>Chatrooms</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={roomName} onChange={(event) => setRoomName(event.target.value)} placeholder="New room name..." />
        <button type="submit">Create room</button>
      </form>
      <ul>
        {rooms.map((rooms) => (
          <li key={rooms.id}>
            <Link href={`/chatroom/${rooms.name}`}>
              <div>{rooms.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
