import { Folders } from "@/domain/classes/folders";
import { Task } from "@/domain/classes/task";
import { Tasks } from "@/domain/classes/tasks";
import { User } from "@/domain/classes/user";
import { Username } from "@/domain/classes/username";

export const userData = new User(
  "hogeId",
  new Username("hoge"),
  new Folders(["All", "Home Improvement", "Fitness and Health"])
);

export const _tasksData = [
  new Tasks(
    [
      new Task(
        "Task in All",
        "You can also add task that doesn't belong to any folder. The task will be organized by the creation time.",
        true
      ),
    ],
    "All"
  ),
  new Tasks(
    [
      new Task(
        "Start a Daily Workout Routine",
        "Choose a workout program that suits your fitness level and goals. Schedule a specific time each day for your workouts. Begin with light exercises and gradually increase intensity over time.",
        true
      ),
      new Task(
        "Plan Balanced Meals for the Week",
        "Create a meal plan for the upcoming week, including breakfast, lunch, dinner, and snacks. Ensure the meals are balanced with a variety of nutrients. Make a shopping list based on your plan.",
        false
      ),
      new Task(
        "Drink More Water",
        "Set a daily water intake goal and track your water consumption. Carry a reusable water bottle with you throughout the day to stay hydrated. Avoid sugary drinks and sodas.",
        false
      ),
    ],
    "Fitness and Health"
  ),

  new Tasks(
    [
      new Task(
        "Paint Living Room",
        "Choose a color and purchase paint. Clear the room of furniture and prepare the walls. Apply primer and then paint the walls with two coats. Allow time for drying between coats.",
        false
      ),
      new Task(
        "Fix Leaky Faucet",
        "Turn off the water supply to the faucet. Disassemble the faucet handle and identify the source of the leak. Replace the damaged parts or the entire faucet if necessary. Test for leaks after reassembly.",
        false
      ),
    ],
    "Home Improvement"
  ),
];
