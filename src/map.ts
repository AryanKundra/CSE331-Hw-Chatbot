import { AssocList, contains_key, get_value } from "./assoc";

export interface MutableMap<V>{
    /**
     * checks if a key exists in the map
     * @param key the key to check
     * @returns True if the key exsits, false otherwise
     */
    containsKey: (key:string) => boolean;

    /**
   * Gets the value associated with a key.
   * @param key The key to get the value for.
   * @returns The value associated with the key, or throws an error if the key doesn't exist.
   * @throws Error if the key doesn't exist in the map.
   */
  getVal: (key: string) => V;

   /**
   * Sets a key-value pair in the map, replacing the existing value if the key already exists.
   * @param key The key to set.
   * @param value The value to associate with the key.
   * @returns True if the value was replaced, false otherwise.
   */
   set: (key: string, value: V) => boolean;

   /**
   * Clears all key-value pairs from the map.
   */
  clear: () => void;
  
}

 class MutableMapImpl<V> implements MutableMap<V> {
    private data: AssocList<V> = { kind: "nil" };
  
    /**
     * Checks if a key exists in the map.
     * @param key The key to check.
     * @returns True if the key exists, false otherwise.
     */
    containsKey = (key: string): boolean => {
      return contains_key(key, this.data);
    };
  
    /**
     * Gets the value associated with a key.
     * @param key The key to get the value for.
     * @returns The value associated with the key, or throws an error if the key doesn't exist.
     * @throws Error if the key doesn't exist in the map.
     */
    getVal = (key: string): V => {
      return get_value(key, this.data);
    };
  
    /**
     * Sets a key-value pair in the map, replacing the existing value if the key already exists.
     * @param key The key to set.
     * @param value The value to associate with the key.
     * @returns True if the value was replaced, false otherwise.
     */
    set = (key: string, value: V): boolean => {
      const replaced = this.containsKey(key);
      this.data = { kind: "cons", hd: [key, value], tl: this.data };
      return replaced;
    };
  
    /**
     * Clears all key-value pairs from the map.
     */
    clear = (): void => {
      this.data = { kind: "nil" };
    };
  }
  
  /**
   * A factory function that creates a new instance of the MutableMapImpl class.
   * @returns A new instance of the MutableMapImpl class.
   */
  export const createMutableMap = <V>(): MutableMap<V> => {
    return new MutableMapImpl<V>();
  };

