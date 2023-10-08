import supabase from "./supabase";

export const getCabins = async () => {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return cabins;
};

export const deleteCabin = async (cabinId) => {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);

  if (error) {
    console.error(error);
    throw new Error(`Unable to delete the cabin!`);
  }
};
